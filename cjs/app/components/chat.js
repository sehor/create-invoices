"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react"),t=require("./ChatStyles.js");exports.default=function(a){var l=a.className,n=void 0===l?"":l,r=a.placeholder,s=void 0===r?"Type a message...":r,u=a.onSend,i=e.useState(""),c=i[0],o=i[1];return e.createElement("div",{className:"chat-container ".concat(n),style:t.default.container},e.createElement("div",{className:"chat-messages",style:t.default.messages}),e.createElement("form",{onSubmit:function(e){e.preventDefault(),c.trim()&&u&&(u(c.trim()),o(""))},style:t.default.form},e.createElement("input",{type:"text",style:t.default.input,value:c,onChange:function(e){return o(e.target.value)},placeholder:s,"aria-label":"Chat input",id:"chat-input"}),e.createElement("button",{type:"submit",style:t.default.button,"aria-label":"Send message"},"Send")))};
//# sourceMappingURL=chat.js.map