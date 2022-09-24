import { defineConfig, splitVendorChunkPlugin, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import eslint from "vite-plugin-checker";

// https://vitejs.dev/config/
export default (conf: { mode: string }) => {
  // .env 파일 읽어오기
  console.log(loadEnv(conf.mode, process.cwd()));

  return defineConfig({
    server: {
      port: 3000,
      open: true,
    },
    preview: {
      port: 8080,
      open: true,
    },
    build: {
      outDir: "publish",
    },
    // CSS 전처리기로 전달할 옵션을 지정합니다.
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "$injectedColor: orange;$injectedBgColor: red;",
        },
      },
    },

    // esbuild 옵션 확장
    esbuild: {
      jsxInject: `import React from "react"`, // jsxInject : JSX에 대한 헬퍼를 사용
    },

    // envPrefix로 시작하는 환경 변수는 import.meta.env를 통해 소스 코드에서 접근 가능
    // envPrefix: "REACT_",

    plugins: [
      react(),

      // 이 플러그인을 사용하면 자동으로 레거시 버전에 대한 청크를 생성한다.
      // 이를 통해 레거시 브라우저 또한 Vite으로 빌드된 앱을 이용할 수 있게 됩니다.
      // 참고로, 생성된 레거시 청크는 브라우저가 ESM을 지원하지 않는 경우에만 불러오게 됩니다.
      // legacy()를 사용하려면 terser를 설치해줘야 한다.
      // 그렇지 않으면 build 시 에러가 발생한다.(ver3부터 terser는 선택적 옵션으로 되었다.)
      legacy(),

      // 이 플러그인은 vender에 대한 청크를 생성해준다.
      // build.rollupOptions.output.manualChunks를 사용해 청크를 분할할 수 있지만 Vite 2.9부터 manualChunks는 더 이상 기본적으로 수정하지 않는다.
      // 만약 계속 manualChunks를 수정하기 원한다면 splitVendorChunkPlugin을 사용하도록 권장하고 있다.
      splitVendorChunkPlugin(),

      eslint({
        typescript: {
          tsconfigPath: "./tsconfig.json",
        },
        eslint: {
          lintCommand: "eslint --cache=true",
          dev: {
            logLevel: ["error"],
          },
        },
        overlay: { position: "br" },
      }),

      // vite 전용 훅 공간
      // name의 값은 임의로 변경 가능

      // Vite의 설정을 실제 사용하기 전 변경할 수 있다.
      // 단 객체 반환을 이용한 방법으로는 원하는 결과를 얻을 수 없을 때만 사용하는 것을 권장한다고 한다.
      {
        name: "config",
        config(config, { mode, command }) {
          console.log("현재 개발환경은?:", mode);
          console.log("내가 입력한 cli 커맨드는?:", command);
        },
      },

      // index.html과 같은 진입점이 되는 정적파일의 내용을 변환하기 위한 훅
      {
        name: "html-transform",
        transformIndexHtml(html, ctx) {
          return html.replace(
            /<title>(.*?)<\/title>/,
            `<title>여기는 jyp의 연구실입니다.</title>`
          );
        },
      },

      // Vite 설정 값이 확정된 후 호출되는 훅
      {
        name: "read-config",
        configResolved(resolvedConfig) {
          console.log("Vite 설정 값이 확정된 값: ", resolvedConfig);
        },
      },

      // 개발 서버를 구성하기 위한 훅
      // {
      //   name: "configure-server",
      //   configureServer(server) {
      //     server.middlewares.use((req, res, next) => {
      //       // 이 곳에서 원하는 방식으로 요청을 핸들링 할 수 있다.
      //       // 해당 상태에서는 내부의 미들웨어보다 먼저 실행되며 내부 미들웨어가 먼저 실행시키고 싶으면 configureServer가 함수를 반환하면 된다.
      //       console.log(req, res, next);
      //     });
      //   },
      // },

      // 사용자가 지정한 방식대로 HMR 업데이트를 수행해주는 훅
      // {
      //   name: "custom-hmr",
      //   handleHotUpdate({ server }) {
      //     server.ws.send({
      //       type: "custom",
      //       event: "special-update",
      //       data: {},
      //     });
      //     return [];
      //   },
      // },
    ],
  });
};
