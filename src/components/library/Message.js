import XtxMessage from "@/components/library/XtxMessage";
import { createVNode, render } from "vue";
//如果通过js渲染vue组件
//1.导入目标组件
//2.创建一个组件渲染容器
//3.将目标单文件vue组件渲染成虚拟dom
//4.将组件虚拟dom对象渲染成真实dom对象
const container = document.createElement("div");
document.body.appendChild(container);
let timer = null;
export default function Message({ type, text }) {
  //将单文件组件转换成虚拟dom对象
  const vNode = createVNode(XtxMessage, { type, text });
  //将虚拟dom对象转换为真实dom对象并将其渲染到container容器中
  // console.log(vNode);
  render(vNode, container);
  clearTimeout(timer);
  timer = setTimeout(() => {
    // render(null, container);
    vNode.component.proxy.show = false;
    container._vnode = null;
  }, 3000);
}
