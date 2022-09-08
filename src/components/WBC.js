import { h, ref } from "vue";

///////////////////////Component WBLink:Component/////////////////////////
let WBLink = {
    // props: ["to", "text", "props"],
    props: { to: null, text: null, props: null },
    setup({ to, text, props }, context) {
        const to_ = ref(to);
        const text_ = ref(text);
        const props_ = ref(props);

        // ---------slots setup---------
        console.log(context.slots);
        let slotDefault = context.slots.default?.();

        let htmlProp = {};
        if (props_.value instanceof Object) htmlProp = props_.value;
        if (to_.value instanceof Object) {
            htmlProp.to = to_.value;
        } else {
            htmlProp.href = to_.value;
        }
        // ---------The Rendered output---------
        if (!to_.value && text_.value) {
            if (props_.value) {
                return () => h("span", htmlProp, text_.value);
            } else return () => text_.value;
        } else if (typeof to_.value === "string") {
            return () => h("a", htmlProp, text_.value);
        } else if (to_.value instanceof Object) {
            return () => h("router-link", htmlProp, text_.value);
        } else return () => text_.value;
    },
};
///////////////////////Component WBHtml:Component/////////////////////////
let WBHtml = {
    props: { html: null },
    setup({ html }, context) {
        const html_ = ref(html);

        if (typeof html_.value !== "string") {
            return () => JSON.stringify(html_.value);
        } else if (typeof html_.value == "string") {
            if (html_.value.includes("[[") && html_.value.includes("]]")) {
                let htmlArray = html_.value
                    .replace(/\[\[/g, "**")
                    .replace(/\]\]/g, "**")
                    .split("**")
                    .map((h) => h.split("|"));
                let htmlArrayOutput = htmlArray.map((aHtml) => {
                    let theText = aHtml?.[0];
                    let theTo = aHtml?.[2];
                    let theProps = aHtml?.[1];

                    if (["null", "undefined"].includes(aHtml[0])) {
                        theText = null;
                    }
                    if (typeof strToObj(theProps) == "string") {
                        theProps = { class: strToObj(theProps) };
                    } else if (strToObj(aHtml[1]) instanceof Object) {
                        theProps = strToObj(theProps);
                    }
                    return h(WBLink, { to: theTo, text: theText, props: theProps });
                });

                return () => htmlArrayOutput;
            } else {
                return () => html_.value;
            }
        }
    },
};
///////////////////////MAin Component WbCompObj:of  WBC Component/////////////////////////

let WBC = {
    props: {
        item: {
            // type: Object,
            default: () => null,
        },
        wrap: {
            // type: String,
            default: () => "div",
        },
        props: {
            // type: String,
            default: () => null,
        },
    },
    // props:['items','wrap'],
    emits: ["update:item"],
    setup({ item, wrap, props }, context) {
        //--------------- Scoped external variables------------------
        const item_ = ref(item);
        const wrap_ = ref(wrap);
        const props_ = ref(props);
        let globalWrap;
        ///////////////////////////////
        // watchEffect(() => {
        //     item = item_.value;
        // });
        // alert(item);
        // watchSyncEffect(() => {
        //     item = item_.value;
        //     alert(item);
        // });
        // watch(
        //     () => item_.value,
        //     (current, old) => {
        //         wrap_.value = "li";
        //         alert(current);
        //         context.emit("update:item", 99999999999);
        //     }
        // );
        // watch(
        //     () => item_,
        //     (v, o) => {
        //         wrap_.value = "li";
        //         // context.emit("update:item", v);
        //         // context.emit("update:item", 9999999999);
        //         // alert(item);
        //     }
        // );
        //-------------------- ~ operator in Array-------------------------

        // globalWrap = wrap_.value;
        if (
            Array.isArray(item_.value) &&
            item_.value.findIndex((e) => typeof e == "string" && e[0] == "<" && e[e.length - 1] == ">") >= 0
        ) {
            let k = item_.value.findIndex((e) => typeof e == "string" && e[0] == "<" && e[e.length - 1] == ">");
            let arrayWrap = item_.value.find((e) => typeof e == "string" && e[0] == "<" && e[e.length - 1] == ">");

            wrap_.value = arrayWrap?.replace("<", "")?.replace(">", "");
            item_.value.splice(k, 1);
        }

        // -----Vnodes to render------
        var wrapRend;
        var mainRend = h("div", [item_.value, "To CHECKKKKKKKKKKKKKKKKKKk", typeof item_.value]);

        let localWrap;
        let rendItem = h(WBHtml, { html: item_.value });
        if ([null, undefined].includes(item_.value)) {
        } else if (typeof item_.value == "boolean") {
            localWrap = "input";
            rendItem = {
                type: "checkbox",
                checked: item_.value,
                disabled: true,
                ...props_.value,
            };
            if (wrap_.value == "input") {
                rendItem.disabled = false;
                rendItem.onChange = (e) => {
                    item_.value = e.target.checked;
                };
            } else if (!wrap_.value?.includes("~")) {
                globalWrap = wrap_.value;
                // globalWrap = wrap_.value.replace("~", "");
            }
        } else if (["string", "number"].includes(typeof item_.value)) {
            if (wrap_.value == "input") {
                localWrap = "input";
                rendItem = {};
                rendItem.value = item_.value;
                rendItem.type = typeof item_.value;
                rendItem.disabled = false;

                rendItem.onInput = (e) => {
                    item_.value = e.target.value;

                    // displayRend =h('u', { title: item_.value }, `${item_.value}`);
                };
                rendItem = { ...rendItem, ...props_.value };
            } else if (!wrap_.value?.includes("~")) {
                globalWrap = wrap_.value;
                // globalWrap = wrap_.value.replace("~", "");
            }
            mainRend = h("input", rendItem);
        } else if (Array.isArray(item_.value) && item_.value.length >= 1) {
            globalWrap = wrap_.value?.replace("~", "");
            /*if (Array.isArray(item_.value[0])) {
                rendItem = h(WBC, { item: item_.value[0], wrap: wrap_.value });
            } else if (item_.value[0].length == 1) {
                rendItem = h(WBC, { item: item_.value[0] });
            } else*/ if (wrap_.value?.includes("~")) {
                // globalWrap = wrap_.value?.replace("~", "");

                rendItem = h(
                    WBC,
                    { item: item_.value[0], wrap: wrap_.value },
                    { footer: () => h(WBC, { item: item_.value.slice(1), wrap: wrap_.value }) }
                );
            } else {
                // globalWrap = wrap_.value?.replace("~", "");
                rendItem = item_.value.map((e) => {
                    return h(WBC, { item: e, wrap: wrap_.value });
                });
            }
            // }
        } else if (!Array.isArray(item_.value) && item_.value instanceof Object) {
            if (!item_.value.comp) {
                alert("Object without comp");
                let { props, wrap, ...itemsWitoutProp } = item_.value;
                rendItem = [
                    !item_.value.props?.hide || false
                        ? h(WBC, {
                              item: Object.values(itemsWitoutProp),

                              wrap: item_.value.wrap || null,
                              props: item_.value.props || {},
                          })
                        : null,
                ];
            } else {
                if (Array.isArray(item_.value.comp)) {
                    alert("Object with comp");
                    alert(JSON.stringify(compsListToObject(item_.value)));
                    rendItem = [!item_.value.props.hide || false ? h(WBC, compsListToObject(item_.value)) : null];
                } else {
                    alert("specific case");
                    /*rendItem = h(WBC, { item: "999999999", wrap: item_.value.comp, props: item_.value.props_ || {} });*/
                    let itemProps = {};
                    if (item_.value.props) {
                        itemProps = item_.value.props;
                    }
                    // itemProps.onmousemove = (e) => {
                    // };
                    itemProps.onInput = (event) => {
                        console.log(event);
                        console.log(item);
                        if (item_.value.props.type == "checkbox") {
                            item.props.val = event.target.checked;
                        } else {
                            item.props.val = event.target.value;
                        }
                        context.emit("update:item", event.target.value);
                    };

                    rendItem = h(
                        item_.value.comp,
                        itemProps,
                        item_.value?.props?.html ? [h(WBHtml, { html: item_.value.props.html })] : "props.html absent"

                        // onInput: function (e) {
                        //     alert("msg");
                        //     item_.value.props.val = e.target.value;
                        // item: this.item,
                        // "onUpdate:item": (value) => this.$emit("update:item", value),
                        // this.props.val = e.target.value;

                        // {
                        //     item: "999999999",
                        //                             wrap: item_.value.comp,
                        // props: item_.value.props_ || {},
                        // }
                        // 999999999
                    );

                    // *****************************
                    // add some specific cases
                    // *****************************
                }
            }
        } else if (!item_.value instanceof Object) {
            rendItem = `"${JSON.stringify(item_.value)}" is ${typeof item_.value}. It must be taken into consideration`;
            globalWrap = wrap_.value?.replace("~", "");
        }

        ////////////////////////////
        if (localWrap) {
            mainRend = h(localWrap, rendItem);
        } else {
            mainRend = rendItem;
        }

        ////////////Default production style ////////////////
        let myStyleGlobalWrapBackGround = {};
        let styleGlobalWrapAdjacent = {};
        let styleGlobalWrapEmbedded = {};
        ////////////Personal understanding dewveloppement style ////////////////

        myStyleGlobalWrapBackGround = {
            style: {
                margin: "20px",
                backgroundColor: getRandomColor(),
                // 'backgroundColor': 'grey',
                border: `2px dashed black`,
                "font-size": "100%",
            },
        };
        styleGlobalWrapAdjacent = h("b", { title: item_.value, style: { "font-size": "70%" } }, [
            "--",
            `${JSON.stringify(item_.value)}`,
            "--",
            `<${wrap_.value}> (adjacent)`,
        ]);
        styleGlobalWrapEmbedded = h("span", { title: item_.value, style: { "font-size": "70%" } }, [
            "+++",
            `${wrap_.value}`,
            "+++",
            `${item_.value} (embedded)`,
        ]);
        //////////////////////////////////////////

        // --------------  props of globalWrap: props_.value -----------------
        let styleGlobalWrapBackGround = props_.value || myStyleGlobalWrapBackGround;
        // ---------slots setup---------
        console.log(context.slots);
        let slotHeader = context.slots.header?.();
        let slotFooter = context.slots.footer?.();
        let slotDefault = context.slots.default?.();

        // ---------The Rendered output---------
        if (slotDefault) {
            return () => [slotHeader, slotDefault, slotFooter]; //the rendered output
        } else {
            if (globalWrap) {
                return () => [
                    slotHeader,
                    h(globalWrap, styleGlobalWrapBackGround, [
                        mainRend,
                        styleGlobalWrapAdjacent,
                        h("u", { title: item_.value }, `${item_.value}`),
                        h("b", item),
                    ]),
                    slotFooter,
                ];
            } else {
                return () => [
                    slotHeader,
                    mainRend,
                    styleGlobalWrapEmbedded,
                    h("u", { title: item_.value }, `${item_.value}`),
                    h("b", item),
                    slotFooter,
                ];
            }
        }

        // render(){return h(WBC,{item:true,wrap:'li'})},
        //////////////////////////////////////////
        ///////////////////Methods to put out or to treat///////////////////////
        //////////////////////////////////////////
        // function compsListToObject() {
        //     let compsList = item_.value.comp;
        //     let realObject = [];
        //     realObject = compsToObject(compsList, item_.value);
        //     // return realObject
        //     return {
        //         comps: realObject,
        //         linear: item_.value.linear || false,
        //     };
        // }
        function toLinear(ele, source) {
            // if(ele[0] == "<" && ele[ele.length - 1] == ">"){return ele}
            if (typeof ele == "string") {
                // alert(ele);
                return source[ele] || ele;

                // else return [`<~${source[ele.replace("~", "")].comp}>`, source[ele]];
            } else if (Array.isArray(ele)) {
                // if (ele == []) {
                //     return [];
                // }
                /*   if (ele.length == 1) {
                    return source[ele[0]];
                } else*/ if (ele.length >= 1) return [toLinear(ele[0], source), ...toLinear(ele.slice(1), source)];
                else if (ele.length == 1) return source[ele[0]];
                else {
                    return [];
                }
            }
        }
        function compsListToObject(obj) {
            // alert(JSON.stringify(obj));
            let theObjToReturn = { item: [], props: obj.props || {}, wrap: obj.wrap || "div" };
            if (Array.isArray(obj.comp)) {
                theObjToReturn.item = toLinear(obj.comp, obj);
                // for (let e of obj.comp) {
                //     let a = [];
                //     if (typeof e == "string") {
                //         a = obj[e];
                //     } else if (Array.isArray(e)) {
                //         a.push(obj[e[0]]);
                //     }
                //     theObjToReturn.item.push(a);
                // }
                alert(JSON.stringify(theObjToReturn));
                // let realObject;
                // realObject = obj.comp.map((e) => {
                //     if (Array.isArray(e)) {
                //         // alert(e);
                //         // theObjToReturn = [compsListToObject(e)];

                //         // alert(JSON.stringify(theObjToReturn));
                //         return compsListToObject(e[0]);
                //     } else {
                //         let linear = false;
                //         let wrap = "div";
                //         // let obj.comp=obj[e.replace('~','')]||{comp:e.replace('~','')}
                //         // if(e.includes('~')){obj.comp.linear=true}
                //         let key = e.replace("~", "");
                //         // alert(e);
                //         // alert(typeof obj[key]);

                //         // if (obj[key]) {
                //         // alert("5555555555555");
                //         // alert(JSON.stringify(obj[key]));
                //         if (!Array.isArray(obj[key]) && obj[key] instanceof Object) {
                //             let objToReturn = {};
                //             objToReturn = obj[key];
                //             objToReturn.wrap = `${obj[key]["comp"]}${e.includes("~") ? "~" : ""}`;
                //             // }
                //             // alert(JSON.stringify(objToReturn));
                //             return objToReturn;
                //             // return {
                //             //     props: {},
                //             //     ...obj[key],
                //             //     // ...{
                //             //     linear: !e.includes("~"),
                //             //     // wrap: `${obj[key]["comp"]}`,
                //             //     wrap: `${obj[key]["comp"]}${e.includes("~") ? "~" : ""}`,
                //             //     // }
                //             // };
                //         } else {
                //             // alert("string");
                //             return {
                //                 comp: "div",
                //                 props: {
                //                     html: obj[key],
                //                     key: randomKey("key-str-"),
                //                 },
                //                 // wrap: `span${e.includes("~") ? "~" : ""}`,
                //             };
                //         }
                //  else {
                //     // alert(key)
                //     // alert(Object.keys(source))
                //     return {
                //         comp: key,
                //         linear: !e.includes("~"),
                //         wrap: `${key}${e.includes("~") ? "~" : ""}`,
                //         props: {
                //             hide: !true,
                //             // key: this.randomKey("key-"),
                //             // html:'ddddddddddd'
                //         },
                //     };
                // }
                // }
                // return Array.isArray(e) ? this.compsListToObject(e, source) : source[e]||{comp:'template',html:'aaaaaaaaaaaaaaaaaaaa'}
                // });
                // alert(JSON.stringify(theObjToReturn));
                return theObjToReturn;
            }
        }
    },
};

// let objOfWbC = {
//     setup() {
//         //*************************** the data ref: the SCOPE *******************************
//         let theItem = ref("");
//         // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//         // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//         // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//         // $$$$$$$$$$$$$$$$$$$$$$$ WbLink Component Testing$$$$$$$$$$$$$$$$$$$$$$$$
//         // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//         // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//         // ******************WBLink:simple href***************
//         // ---------------external stylish link with attributes and in same onglet (target not "_blank")---------
//         /*return () =>
//             h(WBLink, { to: "http://stackoverflow.com", text: "Link", style: { color: "red" }, class: "cls0 cls1" });*/
//         // ---------------external stylish link with attributes and in amother onglet (target="_blank")---------
//         // return () =>
//         //     h(WBLink, {
//         //         to: "http://stackoverflow.com",
//         //         text: "Link",
//         //         style: { color: "red" },
//         //         class: "cls0 cls1",
//         //         target: "_blank",
//         //     });
//         // ---------------internal stylish link with attributes and in same onglet (target not "_blank")---------
//         /*return () =>
//             h(WBLink, { to: "subUrl", text: "Link", style: { color: "red" }, class: "cls0 cls1" });*/
//         // ---------------internal stylish link with attributes and in amother onglet (target="_blank")---------
//         // return () =>
//         //     h(WBLink, {
//         //         to: "subUrl",
//         //         text: "Link",
//         //         style: { color: "red" },
//         //         class: "cls0 cls1",
//         //         target: "_blank",
//         //     });
//         // ---------------internal ROUTING (name here) stylish link with attributes and in same onglet (target not "_blank")---------
//         /*  return () =>
//             h(WBLink, { to: { name: "Routing name" }, text: "Link", style: { color: "red" }, class: "cls0 cls1" });*/
//         // ---------------internal ROUTING (name here) stylish link with attributes and in amother onglet (target="_blank")---------
//         /*        return () =>
//             h(WBLink, {
//                 to: { name: "Routing name" },
//                 text: "Link",
//                 style: { color: "red" },
//                 class: "cls0 cls1",
//                 target: "_blank",
//             });*/
//         // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//         // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//         // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//         // $$$$$$$$$$$$$$$$$$$$$$$ WbHtml Component Testing$$$$$$$$$$$$$$$$$$$$$$$$
//         // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//         // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//         // ******************WBHtml:simple type***************
//         // return () => h(WBHtml, { html: false });
//         // return ()=>h(WBHtml,{html:88888888888})
//         // return ()=>h(WBHtml,{html:{a:555}})
//         // return ()=>h(WBHtml,{html:[88888888888]})
//         // ******************WBHtml:string type without props and link***************
//         // return () => h(WBHtml, { html: "bonjour tout le monde" });
//         // ******************WBHtml:string type with string props(it is an empty class)***************
//         // return () => h(WBHtml, { html: "[[bonjour tout le monde||]]" });
//         // ******************WBHtml:string type with string props(it is a class)***************
//         // return () => h(WBHtml, { html: "[[bonjour tout le monde|cl0 cl1]]" });
//         // ******************WBHtml:string type with empty string props and internal url (target not "_blank")***************
//         // return () => h(WBHtml, { html: "[[bonjour tout le monde||url]]" });
//         // ******************WBHtml:string type with props of a and internal url in new page :target="_blank"***************
//         // return () => h(WBHtml, { html: `[[bonjour tout le monde|{"target":"_blank"}|url]]` });
//         // ******************WBHtml:string type with object props and internal url in new page :target="_blank"***************
//         /*        return () =>
//             h(WBHtml, {
//                 html: `[[bonjour tout le monde|{"style":{"color":"red","backgroundColor":"grey"},"target":"_blank"}|url]]`,
//             });*/

//         // ******************WBHtml:string type with object props and external url in new page :target="_blank"***************
//         /*        return () =>
//             h(WBHtml, {
//                 html: `[[bonjour tout le monde|{"style":{"color":"red","backgroundColor":"grey"},"target":"_blank"}|http://www.wi-bg.com]]`,
//             });*/
//         // ******************WBHtml:string type with object props and INTERNAL ROUTER url in new page :target="_blank"***************
//         /*        return () =>
//             h(WBHtml, {
//                 html: `[[bonjour tout le monde|{"style":{"color":"red","backgroundColor":"grey"},"target":"_blank"}|{"name":"bla"}]]`,
//             });*/
//         // ******************WBHtml:string type with object props and internal url in new page :target="_blank"***************
//         /*        return () => h(WBHtml, { html: `[[bonjour tout le monde|{"style":{"color":"red"}}]]` });
//         return () =>
//             h(WBHtml, {
//                 html: "[[ hi [[]] mr [[||]] ! bonjour [[tout|cl0 cl1|ssss]] alll [[tout|cl0 cl1]] le [[monde]] comment [[vas tu||https://stackoverflow.com]]? link to [[OBJECT]]]]",
//             });*/
//         // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//         // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//         // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//         // $$$$$$$$$$$$$$$$$$$$$$$ WBC Component Testing$$$$$$$$$$$$$$$$$$$$$$$$
//         // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//         // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//         //******************************************************************//
//         //***** Without props: WBC has no effect Except the SLOTS*******//
//         //******************************************************************//
//         // ------empty cases  --------
//         // return ()=>h(WBC)
//         // return ()=>h(WBC,null)
//         // return ()=>h(WBC,undefined)
//         // ------empty cases WITH SLOTS  --------
//         // return ()=>h(WBC,null,{header:()=>h('div','header SLOTS'),footer:()=>h('div','footer SLOTS')})
//         // ------item_ == 'boolean'--------
//         // return ()=>h(WBC,true)
//         // ------'string' case--------
//         // return () => h(WBC, "bla bla");
//         // return () =>
//         // ------'Array' case--------
//         // return ()=>h(WBC,['bla bla ',h('li','apple'),h('li','orange'),h('li','kiwi')])
//         // return ()=>h(WBC,['bla bla ',88,'aaaa',99])
//         // ------'Array' case WITH SLOTS--------
//         // return ()=>h(WBC,['bla bla ',h('li','apple'),h('li','orange'),h('li','kiwi')],{header:()=>h('div','header SLOTS'),footer:()=>h('div','footer SLOTS')})
//         //************************************************************//
//         //***************** With props {item=...} ********************//
//         //************************************************************//
//         // ------empty cases  --------
//         // return () => h(WBC, { item: undefined });
//         // return ()=>h(WBC,{item:null})
//         // ------empty cases WITH SLOTS  --------
//         // return ()=>h(WBC,{item:null},{header:()=>h('div','header SLOTS'),footer:()=>h('div','footer SLOTS')})
//         // ------item_.value == 'boolean'--------
//         // return () => h(WBC, { item: true });
//         //----- with grlobal props-----
//         // return () => h(WBC, { item: true, props: { style: { color: "red" } } });
//         // return ()=>h(WBC,{item:!true})
//         // return ()=>h(WBC,{item:true,wrap:'li'})
//         // return () => h(WBC, { item: true, wrap: "input" }); //reactive v-model to the item
//         //----- with grlobal props----
//         /*      let types = ["button", "checkbox", "color", "date", "datetime-local", "email", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week", ]; return () =>
//             types.map((e) => [
//                 h("div", { style: { backgroundColor: "grey" } }, `------- input with ${e} type------`),
//                 h(WBC, {
//                     item: e,
//                     wrap: "input",
//                     props: { type: e, title: `title:type is ${e}` },
//                 }),
//             ]);*/
//         //reactive v-model to the item
//         // ------item_.value == 'boolean' with SLOTS--------
//         // return ()=>h(WBC,{item:true,wrap:'input'},{header:()=>h('div','header SLOTS'),footer:()=>h('div','footer SLOTS')})
//         // return ()=>h(WBC,{item:true,wrap:'input'},{default:()=>h('div','default SLOTS OVERRIDED'),header:()=>h('div','header SLOTS'),footer:()=>h('div','footer SLOTS')})
//         // ------item_.value == 'string'--------
//         // return () => h(WBC, { item: "[[bla bla||https://stackoverflow.com]]" });
//         // return ()=>h(WBC,{item:'bla bla', wrap:'li'})
//         // return () => h(WBC, { item: "bla bla", wrap: "input" });
//         //----- with grlobal props-----
//         // return () =>
//         //     h(
//         //         WBC,
//         //         {
//         //             item: "bla bla",
//         //             wrap: "li",
//         //             props: { style: { color: "red", backgroundColor: "yellow" }, name: "name of ali baba" },
//         //         }
//         //     );
//         // return () =>
//         //     h(WBC, { props: { style: { color: "red", backgroundColor: "yellow" }, name: "ali baba" } }, "bla bla");
//         // ------item_.value == 'number'--------
//         // return () => h(WBC, { item: 99999 });
//         // return ()=>h(WBC,{item:9999,wrap:'span'})
//         // return () => h(WBC, { item: 9999, wrap: "input" });
//         // ------item_.value is an ARRAY:ADJACENT case wrap without "~"--------
//         // return () => h(WBC, { item: [true,true,true] })
//         // return () => h(WBC, { item: [true,true,true,true],wrap:'input' })
//         // return () => h(WBC, { item: [true, true, true, true], wrap: "div" });
//         // return () => h(WBC, { item: ['111', '222', '3333'] ,wrap:'p'})
//         // return () => h(WBC, { item: ['111', '222', '3333'] })
//         // return () => h(WBC, { item: ['111', '222', '3333'] })
//         // return () => h(WBC, { item: [111, 222, 3333] })
//         // return () => h(WBC, { item: [222,true,111,false,123],wrap:'li' })
//         // ------item_.value is an ARRAY:ADJACENT case wrap without "~"--------
//         // return () => h(WBC, { item: [222,true,111,false,123],wrap:'li' },{header:()=>h('div','header SLOTS'),footer:()=>h('div','footer SLOTS')})
//         //************************************************************//
//         //***************** Nested Component ********************//
//         //************************************************************//
//         // return () => h(WBC, { item: [true,true,false],wrap:'input' })
//         // return () => h(WBC, { item: ['bli','bla','blou'],wrap:'~div' })
//         // return () => h(WBC, { item: [11111, 22222, 33333], wrap: "~li" });
//         //----- with grlobal props-----
//         // return () =>
//         //     h(WBC, {
//         //         item: [11111, 22222, 33333],
//         //         wrap: "~li",
//         //         props: { style: { color: "red", backgroundColor: "green" }, name: "ali baba" },
//         //     });
//         // return () => h(WBC, { item: [[[1111, [true]]]], wrap: "p" });
//         // return () => h(WBC, { item: [true, 11111, 'bla bla', 'ali', 888]})
//         // return () => h(WBC, { item: [true, 11111, "bla bla", [[["ali", 888]]]] }); // in absence case of wrap, [] has no effect
//         // return () => h(WBC, { item: [true, 11111, 'bla bla', [[['ali', 888] ] ]], wrap: '~p' })
//         // return () =>
//         //     h(WBC, {
//         //         item: [[[[[[11111, 222222, "3333333", 4444444, [[[["aaaa", "bbbbb", "ccccc"]]]]]]]]]],
//         //         wrap: "li",
//         //     });
//         // return () => h(WBC, { item: [['ala ala'],'cla cla',false,'bla bla',[[[[[11111,222222,'3333333',4444444,['aaaa','bbbbb','ccccc']]]]]]],wrap:'~p' })
//         // return () => h(WBC, { item: [true, 11111, 'bla bla', false], wrap: '~p' }, { header: () => h('div', 'header SLOTS'), footer: () => h('div', 'footer SLOTS') })
//         // ************************************************************//
//         // return () => h(WBC, { item: ["<~li>", true, 11111, "bla bla", "ali", 888] });
//         // return () => h(WBC, { item: ["<li>", [true, 11111, "bla bla", "ali", 888]] });
//         // return () => h(WBC, { item: [["<li>", true], ["<li>", 11111], "bla bla", "ali", 888] });
//         /*        return () =>
//             h(WBC, {
//                 item: [
//                     [
//                         1000,
//                         ["<tr>", [11111, "bla bla", "ali", 888, "<td>"]],
//                         ["<tr>", [11111, "bla bla", "ali", 888, "<td>"]],
//                         ["77777", 88888888],
//                     ],
//                 ],
//             });*/

//         /*        return () =>
//             h(WBC, {
//                 item: ["<ol~>", ["<li>", 11111, "bla bla", "ali", 888]],
//             });*/
//         /*        return () =>
//             h(WBC, {
//                 item: [[1000, ["<ol>", [11111, "bla bla", "ali", 888, "<li>"]], ["77777", 88888888]]],
//             });*/
//         //************************************************************//
//         //***************** Object ********************//
//         //************************************************************//
//         // ------item_.value == 'object'--------
//         /*return () => h(WBC, { item: { a: 100, b: 20 , c: 30, d: 40, e: 50 }, wrap: "~div" });*/
//         // return () => h(WBC, { item: { a: 100, b: 20, c: 30, d: 40, e: [50,500,500] }, wrap: "~div" });
//         // return () => h(WBC, { item: { a: 100, b: 20, c: 30, d: 40, e: [50, [[[[500, 5000]]]]] }, wrap: "div" });
//         // return () => h(WBC, { item: { a: 100, b: 20, c: 30, d: 40, e: [50, [[[[500, 5000]]]]] }, wrap: "~div" });
//         // return () => h(WBC, { item: { a: 100, b: 20, c: 30, d: 40, e: [50, [[[[500, 5000]]]]] }, wrap: "~div" });
//         //     return () =>
//         //         h(WBC, {
//         //             item: { a: 100, b: 20, c: 30, d: 40, e: [50, [[[[500, 5000]]]]] },
//         //             wrap: "div",
//         //             props: { style: { color: "yellow", backgroundColor: "green" } },
//         //         });
//         ////////////////////////////////////////
//         /*        // ------GWBC: item_ is BASIC 'object' with item.COMP is a STRING-AND props-------
//         return () =>
//             h(WBC, {
//                 item: {
//                     comp: "div",
//                     props: {
//                         hide: !true,
//                         key: "key-A",
//                         name: "name-A",
//                         html: "bla bla",
//                         val: "",
//                         style: { color: "red", backgroundColor: "green" },
//                     },
//                 },
//             });*/
//         /*
//         // ------GWBC: item_ is BASIC 'object' with item.COMP is a DIV-AND props and WBHtml string-------

//         theItem.value = {
//             comp: "div",
//             props: {
//                 hide: !true,
//                 key: "key-A",
//                 name: "name-A",
//                 val: "",
//                 html: `[[stylish bla bla|{"style":{"color":"white"}}|aaaaaaaaaaaa]]`,
//                 style: { color: "green", backgroundColor: "red" },
//             },
//         };
// */

//         /*        // ------GWBC: item_ is BASIC 'object' with item.COMP is a INPUT of type=TEXT and VModel to item.props.val--------
//         theItem.value = {
//             comp: "input",
//             props: {
//                 hide: !true,
//                 key: "key-A",
//                 name: "name-A",
//                 type: "text",
//                 val: "",
//                 html: `[[stylish bla bla|{"style":{"color":"white"}}|aaaaaaaaaaaa]]`,
//                 style: { color: "green", backgroundColor: "red" },
//             },
//         };
//         return () => [
//             h(WBC, {
//                 item: theItem.value,
//             }),
//             `----${theItem.value.props.type}---->value=${theItem.value.props.val}`,
//             h("br"),
//         ];
// */
//         /*
// // ------GWBC: item_ is BASIC 'object' with item.COMP is a INPUT of type=checkbox and VModel to item.props.val--------
//         theItem.value = {
//             comp: "input",
//             props: {
//                 hide: !true,
//                 key: "key-A",
//                 name: "name-A",
//                 type: "checkbox",
//                 val: "",
//                 html: `[[stylish bla bla|{"style":{"color":"white"}}|aaaaaaaaaaaa]]`,
//                 style: { color: "green", backgroundColor: "red" },
//             },
//         };
//         return () => [
//             h(WBC, {
//                 item: theItem.value,
//             }),
//             `----${theItem.value.props.type}---->value=${theItem.value.props.val}`,
//             h("br"),
//         ];*/
//         /*
//         // ------GWBC: item_ is BASIC 'object' with item.COMP is a INPUT of all types-AND vModel to item.props.val-------
//         let types = [
//             "button",
//             "checkbox",
//             "color",
//             "date",
//             "datetime-local",
//             "email",
//             "hidden",
//             "image",
//             "month",
//             "number",
//             "password",
//             "radio",
//             "range",
//             "reset",
//             "search",
//             "submit",
//             "tel",
//             "text",
//             "time",
//             "url",
//             "week",
//         ];
//         theItem.value = types.map((e) => ({
//             comp: "input",
//             props: {
//                 hide: !true,
//                 key: "key-A",
//                 name: "name-A",
//                 val: "",
//                 type: e,
//                 html: `[[it s ${e}-type|{"style":{"color":"white"}}|aaaaaaaaaaaa]]`,
//                 style: { color: "green", backgroundColor: "red" },
//                 value: "sssss",
//             },
//         }));

//         return () =>
//             theItem.value.map((e) => [
//                 h(WBC, {
//                     item: e,
//                 }),
//                 `----${e.props.type}---->value=${e.props.val}`,
//                 h("br"),
//             ]);

// */
//         /*        // ------GWBC: item_ is BASIC 'object' with item.COMP is a LI --------
//         theItem.value = {
//             comp: "li",
//             props: {
//                 title: "Example of video from samplelib.com",
//                 style: {
//                     width: "50%",
//                     height: "500",
//                     border: "1px solid black",
//                 },
//             },
//         };
//         return () => [
//             h(WBC, {
//                 item: theItem.value,
//             }),
//             `----${theItem.value.props.type}---->value=${theItem.value.props.val}`,
//             h("br"),
//         ];*/

//         /*
//         // ------GWBC: item_ is BASIC 'object' with item.COMP is a VIDEO --------
//         theItem.value = {
//             comp: "video",
//             props: {
//                 slotA: "<b>Title:</b> video-GWBC stylished with CSS: [[link||//samplelib.com/lib/preview/mp4/sample-5s.mp4]] ",
//                 slotZ: "All Rights Reserved [[©2021|red]] ",
//                 src: "//samplelib.com/lib/preview/mp4/sample-5s.mp4",
//                 title: "Example of video from samplelib.com",
//                 controls: true,
//                 style: {
//                     width: "50%",
//                     height: "500",
//                     border: "1px solid black",
//                 },
//             },
//         };
//         return () => [
//             h(WBC, {
//                 item: theItem.value,
//             }),

//             h("br"),
//         ];
// */
//         /*
//         // ------GWBC: item_ is BASIC 'object' with item.COMP is a IMAGE --------
//         theItem.value = {
//             comp: "img",
//             props: {
//                 slotA: "<b>Title:</b> img-GWBC stylished with CSS: [[link||https://images.unsplash.com/photo-1660677668778-415e248707f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80]] ",
//                 slotZ: "All Rights Reserved [[©2021|red]] ",
//                 src: "https://images.unsplash.com/photo-1660677668778-415e248707f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80",
//                 title: "Example of image from unsplash.com",
//                 class: "red",
//                 style: {
//                     width: "50%",
//                     height: "500",
//                     border: "1px solid black",
//                 },
//             },
//         };
//         return () => [
//             h(WBC, {
//                 item: theItem.value,
//             }),

//             h("br"),
//         ];
// */
//         /*
//         // ------GWBC: item_ is BASIC 'object' with item.COMP is a frame --------
//         theItem.value = {
//             comp: "iframe",
//             props: {
//                 slotA: "<b>Title:</b> iframe-GWBC of [[W3Schools||https://www.W3Schools.com]] ",
//                 slotZ: "All Rights Reserved [[©2021|red]] ",
//                 src: "https://www.W3Schools.com",
//                 title: "W3Schools Free Online Web Tutorials",
//                 class: "red",
//                 width: "50%",
//                 height: "500",
//                 style: "border:1px solid black;",
//             },
//         };
//         return () => [
//             h(WBC, {
//                 item: theItem.value,
//             }),

//             h("br"),
//         ];
// */

//         // ------GWBC: item_ is 'object' with COMP--------
//         /*return () => h(WBC, { item: { comp: "a", a: 100, b: 20, c: 30, d: 40, e: 50 }, wrap: "~div" });*/
//         /*
//         // ------GWBC: item_ is 'object' with item.COMP is an ARRAY--------
//         return () =>
//             h(WBC, {
//                 item: {
//                     comp: [[[[["a", "b"]]]]],
//                     // comp: [["a"]],
//                     // comp: ["a", "b", "c"],
//                     // comp: [[[["a", "b"]]], "c", "d"],
//                     props: { style: { color: "green" } },
//                     a: "100",
//                     b: "20",
//                     c: "30",
//                     d: "40",
//                     e: "50",
//                     wrap: "div",
//                 },
//             });*/
//         // ------GWBC: item_ is 'object' without item.COMP -------
//         /*        return () =>
//             h(WBC, {
//                 item: {
//                     props: {
//                         hide: false,
//                         class: "clA",
//                         key: "key-A",
//                         name: "name-A",
//                         style: { color: "red" },
//                     },
//                     a: 100,
//                     b: 20,
//                     c: 30,
//                     d: 40,
//                     e: 50,
//                     wrap: "~li",
//                 },
//             });*/
//         /*        // ------GWBC: item_ is 'object' with item.COMP is an ARRAY-AND props-------
//         return () =>
//             h(WBC, {
//                 item: {
//                     comp: ["a", "b", "c", "d"],
//                     props: {
//                         hide: false,
//                         class: "clA",
//                         key: "key-A",
//                         name: "name-A",
//                         style: { color: "red" },
//                     },
//                     a: 100,
//                     b: 20,
//                     c: 30,
//                     d: 40,
//                     e: 50,
//                     wrap: "li",
//                 },
//             });*/
//         /*        // ------GWBC: item_ is 'object' with item.COMP is an ARRAY-AND props-------
//         return () =>
//             h(WBC, {
//                 item: {
//                     comp: ["a", "b", "c", "d", "a", "b", "a", [[["a", "a", "a"]]]],
//                     props: { hide: !true, key: "key-A", name: "name-A", style: { color: "red" } },
//                     a: { a: 100 },
//                     b: { b: 20 },
//                     c: 30,
//                     d: { comp: "li" },
//                     e: 50,
//                     wrap: "~div",
//                 },
//             });*/

//         // ------GWBC: item_ is 'object' with item.COMP is an ARRAY-AND props-------
//         return () =>
//             h(WBC, {
//                 item: {
//                     comp: [["<~li>", ["a", "b"]], "c", "d"],
//                     props: {
//                         hide: false,
//                         class: "clA",
//                         key: "key-A",
//                         name: "name-A",
//                         style: { color: "blue" },
//                     },
//                     a: {
//                         comp: "div",
//                         props: {
//                             // slotA: "<b>Title:</b> iframe-GWBC of [[W3Schools||https://www.W3Schools.com]] ",
//                             // slotZ: "All Rights Reserved [[©2021|red]] ",
//                             // src: "https://www.W3Schools.com",
//                             // title: "W3Schools Free Online Web Tutorials",
//                             width: "50%",
//                             height: "500",
//                             style: { backgroundColor: "red", border: "1px solid black" },
//                         },
//                     },
//                     b: "20",
//                     c: "30",
//                     d: "40",
//                     e: "50",
//                     // wrap: "~li",
//                 },
//             });
//         ///////////////////////////////////////////////////////
//         /*        // ------LIST OF GWBC: item_ is A LIST OF GWBC-------
//         theItem.value = [
//             {
//                 comp: "div",
//                 props: {
//                     width: "50%",
//                     height: "500",
//                     style: { border: "1px solid black", color: "red" },
//                     html: "div root",
//                 },
//             },
//             {
//                 comp: "div",
//                 props: {
//                     class: "red",
//                     width: "50%",
//                     height: "500",
//                     style: "border:1px solid black;",
//                     html: "div root",
//                 },
//             },
//             {
//                 comp: "div",
//                 props: {
//                     class: "red",
//                     width: "50%",
//                     height: "500",
//                     style: "border:1px solid black;",
//                     html: "div root",
//                 },
//             },
//         ];

//         return () =>
//             h(WBC, {
//                 item: theItem.value,
//             });*/

//         ///////////////////////////////////////////////////////
//         /*        // ------LIST OF GWBC: item_ is A LIST OF GWBC-------
//         theItem.value = [
//             {
//                 comp: "div",
//                 props: {
//                     slotA: "<b>Title:</b> iframe-GWBC of [[W3Schools||https://www.W3Schools.com]] ",
//                     slotZ: "All Rights Reserved [[©2021|red]] ",
//                     src: "https://www.W3Schools.com",
//                     title: "W3Schools Free Online Web Tutorials",
//                     class: "red",
//                     width: "50%",
//                     height: "500",
//                     style: "border:1px solid black;",
//                 },
//             },
//             {
//                 comp: "iframe",
//                 props: {
//                     slotA: "<b>Title:</b> iframe-GWBC of [[W3Schools||https://www.W3Schools.com]] ",
//                     slotZ: "All Rights Reserved [[©2021|red]] ",
//                     src: "https://www.W3Schools.com",
//                     title: "W3Schools Free Online Web Tutorials",
//                     class: "red",
//                     width: "50%",
//                     height: "500",
//                     style: "border:1px solid black;",
//                 },
//             },
//             {
//                 comp: "iframe",
//                 props: {
//                     slotA: "<b>Title:</b> iframe-GWBC of [[W3Schools||https://www.W3Schools.com]] ",
//                     slotZ: "All Rights Reserved [[©2021|red]] ",
//                     src: "https://www.W3Schools.com",
//                     title: "W3Schools Free Online Web Tutorials",
//                     class: "red",
//                     width: "50%",
//                     height: "500",
//                     style: "border:1px solid black;",
//                 },
//             },
//         ];
//         return () => [
//             h(WBC, {
//                 item: theItem.value,
//             }),

//             h("br"),
//         ];*/

//         ////////////////////////////////////////////////////////////
//     },
// };
///////////////////////////The Vue APP named WBCApp/////////////////////////////

//creation of Vue APP named WBCApp
// const WBCApp = createApp(objOfWbC);

// Mount Vue application to the element id
// WBCApp.mount("#app");

/////////////////// My kitchen///////////////////////
// window.vue = Vue;

// window.v = WBCApp;
// window.get_attrs = get_attrs

function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function strToObj(str) {
    try {
        return JSON.parse(str);
    } catch (error) {
        return str;
    }
}

function randomKey(par, integer = 1000) {
    return par + Math.floor(Math.random() * integer);
}

export default WBC;
