import Compressor from "compressorjs";
import { useCallback, useEffect, useRef } from "react";

export const base64ToFile = (base64: string, fileName: string) => {
  let arr = base64.split(','),
    type = arr[0].match(/:(.*?);/)?.[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, {
    type
  });
};

export const base64ToWebp = (base64: string, name: string, type = 'base64') => {
  return new Promise(resolve => {
    // const imageFileReader = new FileReader();
    // imageFileReader.onload = function (e) {
    const image = new Image();
    image.src = base64;
    image.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      canvas.getContext("2d")?.drawImage(image, 0, 0);
      let data = canvas.toDataURL("image/webp")
      if (type === 'file') {
        resolve(base64ToFile(data, (name || `img${Date.now()}`) + ".webp"))
      } else {
        resolve(data);
      }
    }
    // }
    // imageFileReader.readAsDataURL(file);
  })

}

export const file2Base64 = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    // readAsDataURL
    fileReader.readAsDataURL(file);
    fileReader.onerror = () => {
      reject(new Error('blobToBase64 error'));
    };
  })
}

export const fileCompressor = (file: File, options: any): Promise<File | Blob> => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      ...options,
      success(blob) {
        resolve(blob)
      },
      error(err) {
        reject(err);
      }
    })
  })
}
export const src2webp = (src: string): Promise<Blob> => {
  return new Promise((res, rej) => {

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')

    const img = new Image();
    img.src = src;
    img.crossOrigin = 'anonymous';
    img.onload = (e: Event) => {
      console.log(3444444);
      canvas.width = img.width;
      canvas.height = img.height;
      const target = e.target as HTMLImageElement;
      URL.revokeObjectURL(target.src);
      context?.drawImage(target, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(data => res(data as Blob), 'image/webp')
    }
    img.onerror = err => rej(err)
  })
}



export const useLazyImgs = (path?: string, parent?: string, cd?: Function) => {
  const domsRef = useRef<NodeListOf<any>>()
  const imgListener = useCallback((path = 'lazy') => {
    let realPath = 'lazy';
    if (typeof path == 'string') {
      // 有可能是wheel事件对象
      realPath = path
    }
    const doms = domsRef.current?.length ? domsRef.current : document.getElementsByTagName('img')
    const list = Array.from(doms).filter(dom => dom.classList.contains(realPath))
    const clientHeight = document.documentElement.clientHeight
    const clientWidth = document.documentElement.clientWidth
    const arr = [];
    list.forEach((img, i) => {
      if (
        !(img.getBoundingClientRect().top < -img.clientHeight
          || img.getBoundingClientRect().top > 1.5 * clientHeight)
        && !(img.getBoundingClientRect().left < -clientWidth
          || img.getBoundingClientRect().left > 1.5 * clientWidth)
        && img.getBoundingClientRect().width && img.getBoundingClientRect().height
      ) {
        setTimeout(() => {
          if (img.dataset.src) {
            img.setAttribute('src', img.dataset.src)
            img.setAttribute('srcset', img.dataset.src)
          }
          img.classList.remove('lazy')
          arr.push(i)
        })
      }
    })
  }, [])

  const debounce = (cb: Function, timeout = 300) => {
    let timer: NodeJS.Timeout | null = null;
    return (...props: any) => {
      timer && clearTimeout(timer)
      timer = setTimeout(cb.bind(this, ...props), timeout)
    }
  }

  useEffect(() => {
    path && (domsRef.current = document.querySelectorAll(path))
    imgListener();
    const scroller = debounce(imgListener)
    if (!path) {
      window.addEventListener('scroll', scroller, true)
      window.addEventListener('resize', scroller)
      return () => {
        window.removeEventListener('scroll', scroller, true)
        window.removeEventListener('resize', scroller)
      }
    }
  }, [imgListener])


  return {
    emit: imgListener
  }
}