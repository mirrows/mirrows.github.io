



import { stone } from '@/utils/global'
import Head from 'next/head'
import React from 'react'

type Props = {
  type: string,
  [key: string]: any,
}

export default function SVGIcon({ type, ...props }: Props) {
  return (
    <svg viewBox="0 0 1024 1024" {...props}>
      {{
        logo: (<>
          <g transform="translate(-21.124911,166.879659) scale(0.100000,-0.100000)">
            <path d="M1976 1659 c-58 -14 -105 -55 -133 -115 -20 -44 -23 -66 -21 -126 4 -83 8 -78 37 47 17 77 26 95 56 123 28 26 43 32 80 32 42 0 46 -2 65 -40 24 -47 25 -75 5 -123 -8 -20 -15 -47 -15 -60 0 -22 -5 -25 -60 -30 -99 -9 -185 -72 -208 -153 -7 -23 -19 -47 -27 -54 -12 -10 -14 -26 -9 -74 9 -83 17 -96 61 -96 61 0 119 36 177 109 53 66 116 177 116 204 0 7 17 23 39 35 48 27 71 52 48 52 -9 0 -19 -4 -22 -10 -3 -5 -11 -10 -17 -10 -13 0 -2 64 19 103 14 28 11 57 -13 145 -5 17 -83 52 -114 51 -14 -1 -43 -5 -64 -10z m4 -359 c26 -26 25 -36 -5 -104 -22 -49 -28 -56 -53 -56 -15 0 -37 6 -48 14 -19 14 -19 15 -1 68 35 99 64 121 107 78z m-71 -187 l21 -18 -20 -32 c-14 -23 -27 -33 -45 -33 -48 0 -54 62 -7 89 23 14 27 14 51 -6z" />
            <path d="M4188 1661 c-20 -4 -47 -15 -60 -24 -13 -10 -39 -28 -59 -41 -54 -37 -159 -157 -159 -184 0 -13 -7 -30 -15 -38 -8 -9 -15 -26 -15 -38 0 -13 -6 -29 -14 -36 -8 -6 -13 -17 -10 -25 3 -7 -2 -27 -10 -44 -9 -16 -16 -45 -16 -63 0 -19 -7 -44 -16 -57 -22 -32 -14 -115 14 -143 l21 -21 53 26 c37 17 63 23 85 20 49 -8 99 5 134 34 32 27 139 157 139 169 0 3 14 34 30 68 22 44 41 67 65 80 36 20 54 46 30 46 -7 0 -17 -4 -20 -10 -3 -5 -11 -10 -16 -10 -11 0 -3 40 20 95 15 37 16 45 1 99 -10 40 -23 65 -40 77 -30 22 -91 30 -142 20z m81 -91 l22 -50 -23 -75 c-23 -74 -23 -75 -57 -75 -18 0 -52 -5 -74 -12 -50 -15 -147 -102 -147 -132 0 -12 -11 -37 -24 -56 -18 -27 -22 -44 -19 -80 l5 -45 -25 30 c-18 22 -23 35 -16 47 5 9 9 40 9 68 0 57 27 146 70 229 l29 56 1 -50 c1 -44 17 -110 19 -77 1 7 16 26 34 42 54 47 107 141 107 189 0 40 1 41 34 41 31 0 35 -4 55 -50z m-168 -84 c-15 -38 -35 -23 -28 21 4 19 12 42 19 51 11 13 13 12 16 -14 2 -17 -2 -43 -7 -58z m82 -184 c24 -27 24 -51 -2 -109 -25 -57 -41 -64 -96 -43 -19 7 -26 16 -22 28 11 35 43 117 50 130 12 18 51 15 70 -6z m-72 -182 c25 -14 24 -31 -2 -64 -31 -39 -73 -33 -77 11 -2 23 3 35 20 47 26 19 33 19 59 6z m-188 -96 c-3 -8 -13 -14 -22 -12 -18 4 -26 31 -16 56 6 15 9 14 25 -6 11 -13 16 -30 13 -38z" />
            <path d="M307 1625 c28 -16 71 -48 95 -72 l43 -44 -36 -32 c-19 -18 -57 -49 -82 -70 -55 -44 -74 -77 -87 -149 -10 -53 2 -158 19 -158 4 0 12 26 19 58 14 65 49 144 84 185 23 29 24 29 47 10 l24 -19 -33 -125 c-34 -132 -51 -169 -77 -169 -26 0 -101 -52 -107 -75 -17 -63 14 -78 92 -45 49 21 52 21 80 4 17 -9 35 -27 40 -39 15 -33 83 -50 139 -33 34 10 48 20 60 46 9 19 33 45 55 59 27 18 38 33 38 50 0 14 14 57 32 96 42 98 47 200 12 253 -13 19 -24 40 -24 47 0 11 -124 47 -162 47 -12 0 -18 8 -18 24 0 46 -176 159 -267 173 l-38 5 52 -27z m294 -265 c-25 -21 -51 -26 -51 -10 0 13 31 29 55 29 19 0 19 -1 -4 -19z m88 -56 c9 -25 11 -48 6 -60 -5 -10 -9 -37 -10 -59 -2 -60 -32 -150 -61 -184 -29 -34 -66 -40 -98 -16 -11 8 -29 15 -41 15 -21 0 -45 17 -45 32 0 4 17 16 38 27 47 25 133 111 110 111 -9 0 -38 -18 -63 -40 -58 -50 -80 -53 -71 -8 3 18 18 49 31 68 14 20 25 42 25 48 0 40 106 117 150 109 8 -1 21 -21 29 -43z m-369 -324 c0 -16 -26 -40 -44 -40 -12 0 -6 24 11 42 21 23 33 23 33 -2z m280 -50 c0 -13 -41 -29 -57 -23 -23 9 -13 22 20 26 17 2 33 5 35 5 1 1 2 -3 2 -8z" />
            <path d="M1701 1519 c-10 -24 -22 -62 -26 -83 l-6 -39 33 7 c38 7 104 71 114 111 3 14 5 28 3 30 -2 2 -25 6 -52 10 l-47 7 -19 -43z" />
            <path d="M1210 1420 c-19 -45 -45 -61 -81 -48 -16 6 -49 7 -73 4 -49 -8 -133 -57 -143 -83 -4 -10 -24 -38 -45 -62 -21 -24 -41 -56 -45 -70 -3 -14 -11 -29 -17 -33 -6 -4 -12 -36 -13 -72 -3 -66 -3 -66 24 -66 38 0 76 27 139 97 28 32 55 54 60 50 4 -4 -6 -35 -24 -69 -29 -56 -30 -62 -17 -88 24 -46 62 -70 111 -70 24 0 44 4 44 10 0 5 58 50 129 101 126 89 130 92 141 140 13 52 57 109 85 109 9 0 22 15 31 35 22 54 17 62 -21 25 l-35 -34 0 31 c0 18 -5 35 -11 39 -15 9 -60 -26 -83 -65 -17 -30 -17 -33 -2 -50 15 -17 15 -22 -8 -72 -13 -30 -32 -61 -41 -69 -15 -13 -19 -12 -36 9 -23 28 -24 54 -4 71 8 7 15 25 15 40 0 15 11 62 25 104 14 42 25 83 25 91 0 23 -16 18 -28 -10 -11 -23 -65 -65 -85 -65 -4 0 -5 23 -1 50 8 57 2 64 -16 20z m-123 -86 c7 -18 -16 -66 -29 -58 -10 6 -11 58 -1 67 11 12 23 8 30 -9z m-64 -33 c8 -39 -5 -83 -45 -148 -32 -52 -49 -62 -77 -44 -13 8 -10 20 13 80 29 75 81 155 95 147 5 -3 11 -19 14 -35z m197 -13 c0 -12 -13 -44 -28 -72 -16 -28 -32 -73 -35 -101 -4 -27 -14 -82 -23 -122 l-16 -72 -31 13 c-31 13 -32 14 -29 71 3 60 54 188 86 214 9 8 16 21 16 30 0 23 28 61 46 61 8 0 14 -9 14 -22z m38 -190 c16 -16 15 -48 -2 -48 -14 0 -26 21 -26 46 0 17 12 18 28 2z m-348 -27 c0 -10 -30 -24 -37 -17 -3 3 -2 9 2 15 8 13 35 15 35 2z" />
            <path d="M2570 1395 c-31 -34 -54 -39 -83 -20 -14 9 -50 17 -80 19 -49 3 -59 0 -79 -21 -31 -33 -76 -56 -99 -50 -26 7 -24 -1 16 -63 19 -30 35 -60 35 -66 0 -16 -51 -39 -130 -59 -88 -23 -99 -29 -72 -44 12 -7 22 -17 22 -25 0 -20 70 -76 95 -76 27 0 165 47 180 61 6 6 5 30 -3 67 -13 62 -14 62 49 103 34 23 18 34 -21 14 -37 -19 -41 -16 -65 48 -16 42 -16 50 -4 58 26 17 64 6 67 -19 3 -18 8 -23 23 -19 12 3 19 0 19 -9 0 -19 5 -18 55 12 44 25 105 86 105 104 0 15 -4 13 -30 -15z m-280 -295 c0 -55 -4 -60 -43 -53 -21 4 -27 11 -27 31 0 27 47 85 62 76 4 -3 8 -27 8 -54z" />
            <path d="M2794 1400 c-5 -5 -34 -14 -64 -20 -30 -6 -61 -17 -70 -26 -13 -13 -11 -14 28 -8 l42 7 0 -34 c0 -19 -9 -45 -20 -59 -11 -14 -20 -38 -20 -54 0 -16 -11 -49 -26 -73 -19 -33 -54 -161 -54 -200 0 -3 43 36 96 86 53 50 101 91 106 91 11 0 6 -74 -7 -117 -10 -33 6 -29 105 20 73 36 88 48 105 83 43 89 99 164 131 174 17 6 36 22 43 36 19 42 13 47 -21 18 l-33 -27 -3 41 c-3 34 -7 42 -23 42 -11 0 -34 -13 -50 -30 -29 -28 -30 -32 -23 -90 6 -55 4 -63 -21 -96 -32 -41 -50 -51 -69 -35 -12 10 -11 19 1 61 8 27 13 72 11 100 l-3 51 -40 -35 c-22 -20 -43 -36 -46 -36 -4 0 -9 -14 -13 -30 -4 -22 -15 -35 -41 -47 -19 -9 -37 -14 -40 -11 -6 5 24 128 43 179 14 38 -1 62 -24 39z m-18 -268 c-14 -27 -56 -71 -56 -59 0 4 7 25 16 47 11 27 22 40 35 40 18 0 18 -2 5 -28z m174 -39 c0 -21 -29 -53 -47 -53 -15 0 -10 34 9 58 15 17 38 15 38 -5z" />
            <path d="M1694 1351 c-28 -9 -64 -25 -78 -35 -23 -15 -25 -20 -15 -33 20 -23 17 -118 -4 -141 -9 -10 -17 -32 -17 -48 0 -53 -20 -103 -73 -180 -29 -41 -61 -90 -71 -107 l-20 -32 23 20 c47 41 211 253 211 273 0 11 11 34 25 50 15 17 29 53 35 84 6 29 17 74 26 101 9 26 14 51 12 56 -2 6 -26 2 -54 -8z" />
            <path d="M3398 1324 c-43 -51 -47 -69 -18 -84 22 -12 21 -24 -6 -111 -16 -49 -53 -92 -96 -108 -25 -9 -27 -8 -33 28 -7 41 8 144 28 189 19 47 49 83 73 92 22 9 34 31 17 30 -20 -1 -75 -40 -126 -86 -52 -48 -56 -55 -76 -137 l-22 -86 23 -41 c25 -43 39 -47 96 -30 46 13 179 116 178 138 0 9 3 40 8 69 8 49 10 52 45 58 20 4 44 14 54 22 26 24 22 2 -14 -92 -17 -44 -32 -92 -34 -107 -2 -15 -12 -40 -22 -55 -11 -15 -23 -44 -27 -63 -3 -19 -25 -63 -48 -97 -22 -35 -38 -66 -36 -69 8 -8 104 102 158 181 26 39 57 78 69 87 12 10 21 25 21 33 0 8 5 15 10 15 6 0 10 7 10 16 0 32 33 85 62 100 27 14 31 14 49 -2 23 -21 24 -42 2 -66 -14 -16 -14 -18 0 -18 21 0 50 39 72 97 10 26 22 53 27 60 15 18 -30 73 -60 73 -13 0 -40 -13 -59 -30 -40 -36 -49 -37 -72 -9 -17 21 -18 21 -73 5 -31 -9 -58 -23 -62 -31 -3 -8 -15 -15 -26 -15 -15 0 -20 7 -20 29 0 38 -9 61 -24 60 -6 0 -28 -21 -48 -45z" />
          </g>
        </>),
        arrow_left: (<>
          <path d="M257.243317 303.056224c-13.846356 0-25.071002 11.224646-25.071002 25.071002s11.224646 25.071002 25.071002 25.071002c13.845333 0 25.071002-11.224646 25.071002-25.071002S271.089673 303.056224 257.243317 303.056224zM257.243317 350.691127c-12.44238 0-22.562878-10.121522-22.562878-22.563902 0-12.443403 10.120498-22.563902 22.562878-22.563902s22.562878 10.120498 22.562878 22.563902C279.806195 340.569606 269.685697 350.691127 257.243317 350.691127z"></path>
          <path d="M255.843434 309.422212l2.801812 0 0 20.205181-2.801812 0 0-20.205181Z"></path>
          <path d="M255.941672 326.72632l20.203134 0 0 2.801812-20.203134 0 0-2.801812Z"></path>
          <path d="M239.460302 462.750319C378.354676 335.865467 517.179464 208.980615 656.052349 82.228793c57.18849-52.247968 142.42785 32.586163 85.012186 85.016279C617.487008 280.122909 493.910505 392.96186 370.332978 505.844813 494.544955 622.62554 618.711905 739.541343 742.945371 856.364025c56.576553 53.15564-28.662807 138.079822-85.059258 84.96716C518.404362 810.141284 378.943077 678.951383 239.460302 547.761482 216.39498 525.96506 215.805556 484.274542 239.460302 462.750319z"></path>
        </>),
        arrow_right: (<>
          <path d="M257.243317 303.056224c-13.846356 0-25.071002 11.224646-25.071002 25.071002s11.224646 25.071002 25.071002 25.071002c13.845333 0 25.071002-11.224646 25.071002-25.071002S271.089673 303.056224 257.243317 303.056224zM257.243317 350.691127c-12.44238 0-22.562878-10.121522-22.562878-22.563902 0-12.443403 10.120498-22.563902 22.562878-22.563902s22.562878 10.120498 22.562878 22.563902C279.806195 340.569606 269.685697 350.691127 257.243317 350.691127z"></path>
          <path d="M255.843434 309.422212l2.801812 0 0 20.205181-2.801812 0 0-20.205181Z"></path>
          <path d="M255.941672 326.72632l20.203134 0 0 2.801812-20.203134 0 0-2.801812Z"></path>
          <path d="M768.591471 561.249681c-138.89335 126.884852-277.719162 253.769704-416.592047 380.520503-57.187467 52.247968-142.426827-32.586163-85.012186-85.016279 123.576503-112.877837 247.15403-225.715765 370.731556-338.599741C513.507842 401.373437 389.340891 284.457634 265.107425 167.634952c-56.577576-53.15564 28.661783-138.078799 85.059258-84.96716 139.481751 131.189901 278.943037 262.379802 418.425811 393.569704C791.656793 498.033917 792.24724 539.725458 768.591471 561.249681z"></path>
        </>),
        github: (<>
          <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
        </>),
        about_me: (<>
          <path d="M947.2 415.530667h-302.506667c-24.192-2.901333-42.624-24.192-42.624-49.28v-317.44A48.768 48.768 0 0 0 553.301333 0h-105.856c-27.093333 0-48.853333 21.973333-48.853333 48.853333v320.768c-1.322667 24.192-21.290667 43.690667-45.269333 45.909334H274.090667A49.450667 49.450667 0 0 1 231.253333 369.578667V48.853333C231.253333 21.76 209.28 0 182.442667 0H76.544C49.493333 0 27.733333 21.973333 27.733333 48.853333v926.293334C27.733333 1002.24 49.706667 1024 76.544 1024h870.869333c27.093333 0 48.810667-21.973333 48.810667-48.853333V464.384A48.981333 48.981333 0 0 0 947.2 415.530667z m-139.349333 350.293333c0 27.093333-21.973333 48.853333-48.810667 48.853333h-105.856a48.810667 48.810667 0 0 1-48.810667-48.853333v-99.882667c0-27.093333 21.973333-48.853333 48.810667-48.853333h105.856c27.093333 0 48.810667 21.973333 48.810667 48.853333v99.882667z"></path>
        </>),
        demos: (<>
          {/* <path d="M64 224h896v512H64V224z m532.496 640h309.35c65.38 0 118.154-54.164 118.154-121.264V217.264C1024 150.164 971.224 96 905.846 96H546V32h-68v64H118.154C52.774 96 0 150.164 0 217.264v525.472C0 809.836 52.776 864 118.154 864h311.6l-190.826 88.984 28.738 61.628L478 916.532V992h68v-76.516l210.704 98.252 28.738-61.63L596.496 864z"></path> */}
          <path d="M841.142857 475.428571q0 109.142857-54 201.714286T640.571429 823.714286 438.857143 877.714286H347.428571q-8 0-13.142857-5.142857t-5.142857-13.142858V510.285714L206.285714 548q-1.714286 0.571429-5.142857 0.571429-5.714286 0-10.857143-3.428572-7.428571-5.714286-7.428571-14.857143V457.142857q0-13.142857 13.142857-17.714286l133.142857-40.571428v-53.142857L206.285714 383.428571q-1.714286 0.571429-5.142857 0.571429-5.714286 0-10.857143-3.428571-7.428571-5.714286-7.428571-14.857143V292.571429q0-13.142857 13.142857-17.714286l133.142857-40.571429V91.428571q0-8 5.142857-13.142857t13.142857-5.142857h91.428572q8 0 13.142857 5.142857t5.142857 13.142857v103.428572l214.285714-66.285714q8.571429-2.857143 16 2.857142t7.428572 14.857143v73.142857q0 13.142857-13.142857 17.714286L457.142857 306.285714v53.142857l214.285714-66.285714q8.571429-2.857143 16 2.857143t7.428572 14.857143v73.142857q0 13.142857-13.142857 17.714286L457.142857 470.857143v278.285714q107.428571-7.428571 181.714286-86.285714t74.285714-187.428572q0-8 5.142857-13.142857t13.142857-5.142857h91.428572q8 0 13.142857 5.142857t5.142857 13.142857z"></path>
        </>),
        home: (<>
          <path d="M1024 590.432 512 193.024 0 590.432 0 428.416 512 30.976 1024 428.416ZM896 576 896 960 640 960 640 704 384 704 384 960 128 960 128 576 512 288Z"></path>
        </>),
        list: (<>
          <path d="M436.555 310.079l426.325 0c37.251 0 67.397-30.198 67.397-67.424s-30.146-67.409-67.397-67.409l-426.325 0c-37.234 0-67.417 30.184-67.417 67.409s30.184 67.424 67.417 67.424zM240.37 175.246l-80.854 0c-37.24 0-67.424 30.184-67.424 67.409s30.184 67.424 67.424 67.424l80.854 0c37.248 0 67.432-30.198 67.432-67.424s-30.184-67.409-67.432-67.409zM862.88 444.912l-426.325 0c-37.234 0-67.417 30.184-67.417 67.409 0 37.228 30.184 67.424 67.417 67.424l426.325 0c37.251 0 67.397-30.196 67.397-67.424 0-37.225-30.147-67.409-67.397-67.409zM240.37 444.912l-80.854 0c-37.24 0-67.424 30.184-67.424 67.409 0 37.228 30.184 67.424 67.424 67.424l80.854 0c37.248 0 67.432-30.196 67.432-67.424 0-37.225-30.184-67.409-67.432-67.409zM862.88 714.565l-426.325 0c-37.234 0-67.417 30.195-67.417 67.416 0 37.234 30.184 67.423 67.417 67.423l426.325 0c37.251 0 67.397-30.189 67.397-67.423 0-37.222-30.147-67.416-67.397-67.416zM240.37 714.565l-80.854 0c-37.24 0-67.424 30.195-67.424 67.416 0 37.234 30.184 67.423 67.424 67.423l80.854 0c37.248 0 67.432-30.189 67.432-67.423 0-37.222-30.184-67.416-67.432-67.416z" ></path>
        </>),
        code: (<>
          <path d="M153.770667 517.558857l200.387047-197.241905L302.86019 268.190476 48.761905 518.290286l254.439619 243.614476 50.590476-52.833524-200.021333-191.512381zM658.285714 320.316952L709.583238 268.190476l254.098286 250.09981L709.241905 761.904762l-50.590476-52.833524 200.021333-191.512381L658.285714 320.316952z m-112.981333-86.186666L393.99619 785.554286l70.534096 19.358476 151.30819-551.399619-70.534095-19.358476z"></path>
        </>),
        other: (<>
          <path d="M823.652174 155.826087h-178.086957L293.843478 716.8 178.086957 512l200.347826-356.173913h-178.086957L0 512l200.347826 356.173913h178.086957l351.721739-560.973913 115.756521 204.8-200.347826 356.173913h178.086957l200.347826-356.173913z"></path>
        </>),
        plus: (<>
          <path d="M832 1024H192c-106.048 0-192-86.016-192-192V192a192 192 0 0 1 192-192h640a192 192 0 0 1 192 192v640c0 105.984-85.952 192-192 192z m64-832a64 64 0 0 0-64-64H192a64 64 0 0 0-64 64v640c0 35.392 28.608 64 64 64h640c35.392 0 64-28.608 64-64V192z m-192 384h-128v128c0 35.392-28.608 64-64 64s-64-28.608-64-64v-128h-128a64 64 0 1 1 0-128h128v-128a64 64 0 1 1 128 0v128h128a64 64 0 1 1 0 128z" p-id="8411"></path>
        </>),
        plus_no_outline: (<>
          <path d="M802.752 583.936H178.56A49.728 49.728 0 0 1 128 533.376c0-28.736 21.952-50.624 50.56-50.624h624.192c28.672 0 50.56 21.888 50.56 50.56s-21.888 50.624-50.56 50.624z"></path>
          <path d="M490.688 896a49.728 49.728 0 0 1-50.624-50.56V221.184c0-28.672 21.952-50.56 50.56-50.56 28.736 0 50.624 21.888 50.624 50.56v624.128c0 28.672-21.888 50.624-50.56 50.624z"></path>
        </>),
        edit: (<>
          <path d="M896 512a42.666667 42.666667 0 0 0-42.666667 42.666667v256a42.666667 42.666667 0 0 1-42.666666 42.666666H213.333333a42.666667 42.666667 0 0 1-42.666666-42.666666V213.333333a42.666667 42.666667 0 0 1 42.666666-42.666666h256a42.666667 42.666667 0 0 0 0-85.333334H213.333333a128 128 0 0 0-128 128v597.333334a128 128 0 0 0 128 128h597.333334a128 128 0 0 0 128-128v-256a42.666667 42.666667 0 0 0-42.666667-42.666667z m-640 32.426667V725.333333a42.666667 42.666667 0 0 0 42.666667 42.666667h180.906666a42.666667 42.666667 0 0 0 30.293334-12.373333l295.253333-295.68L926.293333 341.333333a42.666667 42.666667 0 0 0 0-60.586666l-180.906666-183.04a42.666667 42.666667 0 0 0-60.586667 0l-120.32 120.746666-296.106667 295.68a42.666667 42.666667 0 0 0-12.373333 30.293334z m459.093333-356.266667l120.746667 120.746667-60.586667 60.586666-120.746666-120.746666zM341.333333 561.92l253.013334-253.013333 120.746666 120.746666L462.08 682.666667H341.333333z"></path>
        </>),
        trash: (<>
          <path d="M959.34602 218.201181c-3.071904-50.23843-44.382613-90.109184-95.35702-90.109184l-95.997 0 0-32.062998c0-53.022343-43.006656-95.997-95.997-95.997l-319.99 0c-53.022343 0-95.997 42.974657-95.997 95.997l0 32.030999-95.997 0c-51.038405 0-92.317115 39.870754-95.389019 90.109184l-0.607981 0 0 69.853817c0 35.326896 28.671104 63.998 63.998 63.998l0 0 0 543.983001c0 70.685791 57.310209 127.996 127.996 127.996l511.984 0c70.685791 0 127.996-57.310209 127.996-127.996l0-543.983001c35.326896 0 63.998-28.671104 63.998-63.998l0-69.821818-0.63998 0zM320.006 96.060998c0-17.695447 14.303553-31.999 31.999-31.999l319.99 0c17.695447 0 31.999 14.303553 31.999 31.999l0 31.999-383.988 0 0-31.999zM831.99 896.035999c0 35.262898-28.735102 63.998-63.998 63.998l-511.984 0c-35.294897 0-63.998-28.735102-63.998-63.998l0-543.983001 639.980001 0 0 543.983001zM895.988 256.023999l0 31.999-767.976001 0 0-63.966001c0-17.695447 14.303553-31.999 31.999-31.999l703.978001 0c17.695447 0 31.999 14.303553 31.999 31.999l0 31.967001zM288.007 896.163995l63.998 0c17.695447 0 31.999-14.303553 31.999-31.999l0-415.987c0-17.695447-14.303553-31.999-31.999-31.999l-63.998 0c-17.695447 0-31.999 14.303553-31.999 31.999l0 415.987c0 17.695447 14.303553 31.999 31.999 31.999zM288.007 448.145995l63.998 0 0 415.987-63.998 0 0-415.987zM480.001 896.163995l63.998 0c17.695447 0 31.999-14.303553 31.999-31.999l0-415.987c0-17.695447-14.303553-31.999-31.999-31.999l-63.998 0c-17.695447 0-31.999 14.303553-31.999 31.999l0 415.987c0 17.695447 14.303553 31.999 31.999 31.999zM480.001 448.145995l63.998 0 0 415.987-63.998 0 0-415.987zM671.995 896.163995l63.998 0c17.695447 0 31.999-14.303553 31.999-31.999l0-415.987c0-17.695447-14.303553-31.999-31.999-31.999l-63.998 0c-17.695447 0-31.999 14.303553-31.999 31.999l0 415.987c0 17.695447 14.303553 31.999 31.999 31.999zM671.995 448.145995l63.998 0 0 415.987-63.998 0 0-415.987z"></path>
        </>),
        enter: (<>
          <path d="M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112c-4.1 3.2-4.1 9.4 0 12.6l141.9 112c5.3 4.2 13 0.4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z"></path>
        </>),
        close: (<>
          <path d="M571.733333 512l268.8-268.8c17.066667-17.066667 17.066667-42.666667 0-59.733333-17.066667-17.066667-42.666667-17.066667-59.733333 0L512 452.266667 243.2 183.466667c-17.066667-17.066667-42.666667-17.066667-59.733333 0-17.066667 17.066667-17.066667 42.666667 0 59.733333L452.266667 512 183.466667 780.8c-17.066667 17.066667-17.066667 42.666667 0 59.733333 8.533333 8.533333 19.2 12.8 29.866666 12.8s21.333333-4.266667 29.866667-12.8L512 571.733333l268.8 268.8c8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866666-12.8c17.066667-17.066667 17.066667-42.666667 0-59.733333L571.733333 512z"></path>
        </>),
        yes: (<>
          <path d="M512 981.333333C251.733333 981.333333 42.666667 772.266667 42.666667 512S251.733333 42.666667 512 42.666667s469.333333 209.066667 469.333333 469.333333-209.066667 469.333333-469.333333 469.333333zM298.666667 516.266667c-12.8 0-21.333333 4.266667-29.866667 12.8-4.266667 8.533333-12.8 21.333333-12.8 29.866666 0 12.8 4.266667 21.333333 12.8 29.866667l119.466667 119.466667c8.533333 8.533333 17.066667 12.8 29.866666 12.8 12.8 0 21.333333-4.266667 29.866667-12.8l302.933333-302.933334c8.533333-8.533333 12.8-17.066667 12.8-29.866666 0-12.8-4.266667-21.333333-12.8-29.866667-8.533333-8.533333-17.066667-12.8-29.866666-12.8-12.8 0-21.333333 4.266667-29.866667 12.8l-273.066667 273.066667-89.6-89.6c-4.266667-8.533333-17.066667-12.8-29.866666-12.8z"></path>
        </>),
        no: (<>
          <path d="M512 64q190.016 4.992 316.512 131.488T960 512q-4.992 190.016-131.488 316.512T512 960q-190.016-4.992-316.512-131.488T64 512q4.992-190.016 131.488-316.512T512 64z m0 394.016l-104-104q-12-12-27.488-12t-27.008 11.488-11.488 27.008 12 27.488l104 104-104 104q-12 12-12 27.488t11.488 27.008 27.008 11.488 27.488-12l104-104 104 104q16 15.008 36.992 9.504t26.496-26.496-9.504-36.992L565.984 512l104-104q12-12 12-27.488t-11.488-27.008-27.008-11.488-27.488 12z"></path>
        </>),
        loading: (<>
          <path d="M512 170.666667v85.333333a256 256 0 1 1-223.573333 131.2L213.930667 345.6A341.333333 341.333333 0 1 0 512 170.666667z"></path>
        </>),
        image: (<>
          <path d="M262 202c-33.138 0-60 26.862-60 60v500c0 33.138 26.862 60 60 60h500c33.138 0 60-26.862 60-60V262c0-33.138-26.862-60-60-60H262z m0-90h500c82.842 0 150 67.158 150 150v500c0 82.842-67.158 150-150 150H262c-82.842 0-150-67.158-150-150V262c0-82.842 67.158-150 150-150z"></path>
          <path d="M402 402m-90 0a90 90 0 1 0 180 0 90 90 0 1 0-180 0Z"></path>
          <path d="M400.874 657.596l114.268 49.728c25.2 10.968 54.63 3.412 71.428-18.34l127.944-165.656c20.256-26.226 57.936-31.066 84.16-10.812A60 60 0 0 1 822 560.002V764.16c0 33.138-26.862 60-60 60H202v-62l140.446-98.646a60 60 0 0 1 58.428-5.916z"></path>
        </>),
        logout: (<>
          <path d="M559.5136 441.07776A61.44 61.44 0 0 0 614.4 379.98592v-85.4016c0-7.2704 2.8672-14.27456 8.04864-19.53792a29.77792 29.77792 0 0 1 41.2672-0.98304l223.82592 207.13472a41.69728 41.69728 0 0 1 0 61.60384l-223.8464 207.13472a29.63456 29.63456 0 0 1-20.11136 7.82336C627.46624 757.76 614.4 745.0624 614.4 729.3952v-85.4016a61.44 61.44 0 0 0-54.8864-61.07136l-186.81856-20.00896C347.09504 560.16896 327.68 538.19392 327.68 512c0-26.19392 19.43552-48.16896 45.01504-50.91328l186.81856-20.00896z m-189.6448-226.34496l-93.0816 23.26528A40.96 40.96 0 0 0 245.76 277.72928v468.52096a40.96 40.96 0 0 0 31.0272 39.7312l93.0816 23.28576A52.46976 52.46976 0 0 1 409.6 860.16a40.96 40.96 0 0 1-40.96 40.96h-143.36a102.4 102.4 0 0 1-102.4-102.4V225.28a102.4 102.4 0 0 1 102.4-102.4h143.36a40.96 40.96 0 0 1 40.96 40.96c0 24.064-16.384 45.056-39.7312 50.8928z"></path>
        </>),
        setting: (<>
          <path d="M512.571429 373.257143c-34.171429 0-66.171429 13.257143-90.4 37.485714-24.114286 24.228571-37.485714 56.228571-37.485715 90.4 0 34.171429 13.371429 66.171429 37.485715 90.4 24.228571 24.114286 56.228571 37.485714 90.4 37.485714 34.171429 0 66.171429-13.371429 90.4-37.485714 24.114286-24.228571 37.485714-56.228571 37.485714-90.4 0-34.171429-13.371429-66.171429-37.485714-90.4a126.811429 126.811429 0 0 0-90.4-37.485714z m471.2 269.142857l-74.742858-63.885714c3.542857-21.714286 5.371429-43.885714 5.371429-65.942857s-1.828571-44.342857-5.371429-65.942858l74.742858-63.885714a36.605714 36.605714 0 0 0 10.628571-40.228571l-1.028571-2.971429a505.714286 505.714286 0 0 0-90.971429-157.371428l-2.057143-2.4a36.708571 36.708571 0 0 0-40.114286-10.857143l-92.8 33.028571c-34.285714-28.114286-72.457143-50.285714-113.828571-65.714286l-17.942857-97.028571a36.628571 36.628571 0 0 0-29.485714-29.371429l-3.085715-0.571428c-59.428571-10.742857-122.057143-10.742857-181.485714 0l-3.085714 0.571428a36.628571 36.628571 0 0 0-29.485715 29.371429l-18.057142 97.485714a403.931429 403.931429 0 0 0-113.028572 65.485715l-93.485714-33.257143a36.571429 36.571429 0 0 0-40.114286 10.857143l-2.057143 2.4a509.634286 509.634286 0 0 0-90.971428 157.371428l-1.028572 2.971429c-5.142857 14.285714-0.914286 30.285714 10.628572 40.228571l75.657143 64.571429c-3.542857 21.485714-5.257143 43.428571-5.257143 65.142857 0 21.942857 1.714286 43.885714 5.257143 65.142857l-75.428572 64.571429a36.605714 36.605714 0 0 0-10.628571 40.228571l1.028571 2.971429c20.685714 57.485714 51.2 110.628571 90.971429 157.371428l2.057143 2.4a36.708571 36.708571 0 0 0 40.114285 10.857143l93.485715-33.257143c34.057143 28 72 50.171429 113.028571 65.485714l18.057143 97.485715a36.628571 36.628571 0 0 0 29.485714 29.371428l3.085714 0.571429a512.308571 512.308571 0 0 0 181.485715 0l3.085714-0.571429a36.628571 36.628571 0 0 0 29.485714-29.371428l17.942857-97.028572c41.371429-15.542857 79.542857-37.6 113.828572-65.714285l92.8 33.028571a36.571429 36.571429 0 0 0 40.114286-10.857143l2.057142-2.4c39.771429-46.971429 70.285714-99.885714 90.971429-157.371428l1.028571-2.971429c4.914286-14.171429 0.685714-30.057143-10.857142-40z m-471.2 59.657143c-110.971429 0-200.914286-89.942857-200.914286-200.914286s89.942857-200.914286 200.914286-200.914286 200.914286 89.942857 200.914285 200.914286-89.942857 200.914286-200.914285 200.914286z"></path>
        </>),
        search: (<>
          <path d="M992.262 871.396 749.71 665.102c-25.074-22.566-51.89-32.926-73.552-31.926C733.414 566.108 768 479.098 768 384 768 171.922 596.078 0 384 0 171.924 0 0 171.922 0 384c0 212.078 171.922 384 384 384 95.098 0 182.108-34.586 249.176-91.844-1 21.662 9.36 48.478 31.926 73.552l206.294 242.552c35.322 39.246 93.022 42.554 128.22 7.356S1031.508 906.718 992.262 871.396zM384 640c-141.384 0-256-114.616-256-256S242.616 128 384 128s256 114.616 256 256S525.386 640 384 640z"></path>
        </>),
        play: (<>
          <path d="M816 816m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"></path>
          <path d="M512 968a456 456 0 1 1 395.76-229.36 32 32 0 0 1-55.52-32 392 392 0 1 0-145.44 145.44 32 32 0 1 1 32 55.52A456 456 0 0 1 512 968z"></path>
          <path d="M424 697.2a48 48 0 0 1-48-48V381.28a48 48 0 0 1 72-41.6l232 134a48 48 0 0 1 0 83.12L448 690.72a48 48 0 0 1-24 6.48z m16-288v212.24l184-106.16z m-24-14z"></path>
        </>),
        chat: (<>
          <path d="M624.5 534.5m-325.5 0a325.5 325.5 0 1 0 651 0 325.5 325.5 0 1 0-651 0Z"></path>
          <path d="M159.534 684.536c46.494-44.727 85.552-62.297 123.134-46.118 16.58 7.137 34.97 12.832 55.177 17.058a39.27 39.27 0 0 1 30.333 30.086c20.969 96.321 92.259 142.26 223.295 142.26 51.56 0 94.224-7.407 127.845-21.876 32.295-13.897 64.764-1.552 102.148 31.796v-220.63c0-94.239-30.647-152.84-90.93-183.574a39.273 39.273 0 0 1-21.42-33.974C704.862 235.03 616.634 159.545 434.403 159.545c-186.515 0-274.87 79.078-274.87 252.468v272.523z m92.085 26.028c2.48 1.067 0.207 1.546-7.93 6.597-14.267 8.859-32.893 25.731-55.043 50.436a61.702 61.702 0 0 1-45.94 20.514C108.625 788.111 81 760.481 81 726.397V412.013C81 193.18 206.34 81 434.404 81c214.652 0 338.605 99.388 352.16 294.146C861.73 422.736 900 504.862 900 617.113v269.384C900 918.81 873.806 945 841.5 945a58.5 58.5 0 0 1-43.55-19.441c-18.66-20.807-34.259-34.932-45.962-42.196-2.558-1.588-4.655-2.678-6.209-3.344-43.357 17.76-94.866 26.35-154.306 26.35-154.92 0-257.22-59.794-293.718-179.782-16.21-4.427-31.593-9.763-46.136-16.023z m70.156 21.795c-21.228-4.438-34.84-25.247-30.401-46.478 4.437-21.23 25.243-34.844 46.471-30.405 28.64 5.988 60.848 9.005 96.56 9.005 186.514 0 274.869-79.078 274.869-252.468 0-4.205-0.053-8.355-0.159-12.449-0.56-21.682 16.56-39.714 38.24-40.274 21.679-0.56 39.708 16.562 40.268 38.244 0.124 4.775 0.185 9.6 0.185 14.479 0 218.833-125.34 331.013-353.404 331.013-40.883 0-78.435-3.517-112.63-10.667z" fill="#0A0B0C"></path>
        </>),
        chat_1: (<>
          <path d="M0 81.279999v409.329462a354.33564 354.33564 0 0 0 30.209066 143.15722l49.673933 112.474021a77.173666 77.173666 0 0 0 123.489154 25.019l147.796954-139.101687a245.705486 245.705486 0 0 1 168.396353-66.782244h245.166442a77.173666 77.173666 0 0 0 77.176488-77.173666V81.279999A77.173666 77.173666 0 0 0 764.737546 4.103511H77.176488A77.173666 77.173666 0 0 0 0.002822 81.279999z"></path>
          <path d="M963.458677 397.143106h-3.982155a58.863088 58.863088 0 0 0-58.865911 58.865911v109.61511a71.684444 71.684444 0 0 1-71.684443 71.684443h-231.504064a227.919842 227.919842 0 0 0-156.207176 61.950599l-82.118199 77.289377a12.491155 12.491155 0 0 0-0.671689 3.547534 61.216821 61.216821 0 0 0 61.213999 61.213999h193.816109a194.589398 194.589398 0 0 1 133.36411 52.888444l116.769443 109.902976a61.216821 61.216821 0 0 0 97.953688-19.845866l39.217599-88.795577a280.551463 280.551463 0 0 0 23.915511-113.346088V458.36275a61.216821 61.216821 0 0 0-61.216822-61.216821z"></path>
        </>)
      }[type]}
    </svg>
  )
}
