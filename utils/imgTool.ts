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