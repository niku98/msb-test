import { RcFile } from "antd/es/upload";

export function getBase64(img: RcFile, callback: Function) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
