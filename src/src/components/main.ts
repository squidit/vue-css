import type { App } from 'vue';
import { ButtonSquid, InputSquid, LoaderSquid } from "@/components";

export default {
  install: (app: App) => {
    app.component('HelloWorld', ButtonSquid);
    app.component('HelloWorld', InputSquid);
    app.component('HelloWorld', LoaderSquid);
  }
};

export { ButtonSquid, InputSquid, LoaderSquid };
