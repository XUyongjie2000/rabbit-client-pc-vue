//导入XtxConfirm单文件组件对象
import XtxConfirm from "@/components/library/XtxConfirm";
import { createVNode, render } from "vue";
//创建目标容器
const container = document.createElement("div");
document.body.appendChild(container);

//供外部调用的用来渲染确认组件的方法
export default function Confirm({ title, content }) {
  return new Promise(function (resolve, reject) {
    //当用户点击确认按钮时要执行的方法
    const onSureButtonClickHandler = () => {
      //如果其他开发者传递了确认逻辑  就执行确认逻辑
      resolve();
      render(null, container);
    };
    //当用户点击取消按钮时要执行的方法
    const onCancelButtonClickHandler = () => {
      //如果其他开发者传递了取消逻辑  就执行取消逻辑
      reject();
      render(null, container);
    };
    //将XtxConfirm单文件组件对象转换成虚拟Dom对象
    const vNode = createVNode(XtxConfirm, {
      title,
      content,
      onSureButtonClick: onSureButtonClickHandler,
      onCancelButtonClick: onCancelButtonClickHandler,
    });
    //渲染XtxConfirm
    render(vNode, container);
  });
}
