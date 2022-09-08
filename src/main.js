import { createApp, h, ref } from "vue";
import WBC from "./components/WBC";
//
let objOfWbC = {
    setup() {
        //*************************** the data ref: the SCOPE *******************************
        let theItem = ref("");
        // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        // $$$$$$$$$$$$$$$$$$$$$$$ WbLink Component Testing$$$$$$$$$$$$$$$$$$$$$$$$
        // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        // ******************WBLink:simple href***************
        // ---------------external stylish link with attributes and in same onglet (target not "_blank")---------
        // return () =>
        // h(WBLink, { to: "http://stackoverflow.com", text: "Link", style: { color: "red" }, class: "cls0 cls1" });
        // ---------------external stylish link with attributes and in amother onglet (target="_blank")---------
        // return () =>
        //     h(WBLink, {
        //         to: "http://stackoverflow.com",
        //         text: "Link",
        //         style: { color: "red" },
        //         class: "cls0 cls1",
        //         target: "_blank",
        //     });
        // ---------------internal stylish link with attributes and in same onglet (target not "_blank")---------
        /*return () =>
            h(WBLink, { to: "subUrl", text: "Link", style: { color: "red" }, class: "cls0 cls1" });*/
        // ---------------internal stylish link with attributes and in amother onglet (target="_blank")---------
        // return () =>
        //     h(WBLink, {
        //         to: "subUrl",
        //         text: "Link",
        //         style: { color: "red" },
        //         class: "cls0 cls1",
        //         target: "_blank",
        //     });
        // ---------------internal ROUTING (name here) stylish link with attributes and in same onglet (target not "_blank")---------
        /*  return () =>
            h(WBLink, { to: { name: "Routing name" }, text: "Link", style: { color: "red" }, class: "cls0 cls1" });*/
        // ---------------internal ROUTING (name here) stylish link with attributes and in amother onglet (target="_blank")---------
        /*        return () =>
            h(WBLink, {
                to: { name: "Routing name" },
                text: "Link",
                style: { color: "red" },
                class: "cls0 cls1",
                target: "_blank",
            });*/
        // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        // $$$$$$$$$$$$$$$$$$$$$$$ WbHtml Component Testing$$$$$$$$$$$$$$$$$$$$$$$$
        // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        // ******************WBHtml:simple type***************
        // return () => h(WBHtml, { html: false });
        // return ()=>h(WBHtml,{html:88888888888})
        // return ()=>h(WBHtml,{html:{a:555}})
        // return ()=>h(WBHtml,{html:[88888888888]})
        // ******************WBHtml:string type without props and link***************
        // return () => h(WBHtml, { html: "bonjour tout le monde" });
        // ******************WBHtml:string type with string props(it is an empty class)***************
        // return () => h(WBHtml, { html: "[[bonjour tout le monde||]]" });
        // ******************WBHtml:string type with string props(it is a class)***************
        // return () => h(WBHtml, { html: "[[bonjour tout le monde|cl0 cl1]]" });
        // ******************WBHtml:string type with empty string props and internal url (target not "_blank")***************
        // return () => h(WBHtml, { html: "[[bonjour tout le monde||url]]" });
        // ******************WBHtml:string type with props of a and internal url in new page :target="_blank"***************
        // return () => h(WBHtml, { html: `[[bonjour tout le monde|{"target":"_blank"}|url]]` });
        // ******************WBHtml:string type with object props and internal url in new page :target="_blank"***************
        /*        return () =>
            h(WBHtml, {
                html: `[[bonjour tout le monde|{"style":{"color":"red","backgroundColor":"grey"},"target":"_blank"}|url]]`,
            });*/

        // ******************WBHtml:string type with object props and external url in new page :target="_blank"***************
        /*        return () =>
            h(WBHtml, {
                html: `[[bonjour tout le monde|{"style":{"color":"red","backgroundColor":"grey"},"target":"_blank"}|http://www.wi-bg.com]]`,
            });*/
        // ******************WBHtml:string type with object props and INTERNAL ROUTER url in new page :target="_blank"***************
        /*        return () =>
            h(WBHtml, {
                html: `[[bonjour tout le monde|{"style":{"color":"red","backgroundColor":"grey"},"target":"_blank"}|{"name":"bla"}]]`,
            });*/
        // ******************WBHtml:string type with object props and internal url in new page :target="_blank"***************
        /*        return () => h(WBHtml, { html: `[[bonjour tout le monde|{"style":{"color":"red"}}]]` });
        return () =>
            h(WBHtml, {
                html: "[[ hi [[]] mr [[||]] ! bonjour [[tout|cl0 cl1|ssss]] alll [[tout|cl0 cl1]] le [[monde]] comment [[vas tu||https://stackoverflow.com]]? link to [[OBJECT]]]]",
            });*/
        // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        // $$$$$$$$$$$$$$$$$$$$$$$ WBC Component Testing$$$$$$$$$$$$$$$$$$$$$$$$
        // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        //******************************************************************//
        //***** Without props: WBC has no effect Except the SLOTS*******//
        //******************************************************************//
        // ------empty cases  --------
        // return ()=>h(WBC)
        // return ()=>h(WBC,null)
        // return ()=>h(WBC,undefined)
        // ------empty cases WITH SLOTS  --------
        // return ()=>h(WBC,null,{header:()=>h('div','header SLOTS'),footer:()=>h('div','footer SLOTS')})
        // ------item_ == 'boolean'--------
        // return ()=>h(WBC,true)
        // ------'string' case--------
        // return () => h(WBC, "bla bla");
        // return () =>
        // ------'Array' case--------
        // return ()=>h(WBC,['bla bla ',h('li','apple'),h('li','orange'),h('li','kiwi')])
        // return ()=>h(WBC,['bla bla ',88,'aaaa',99])
        // ------'Array' case WITH SLOTS--------
        // return ()=>h(WBC,['bla bla ',h('li','apple'),h('li','orange'),h('li','kiwi')],{header:()=>h('div','header SLOTS'),footer:()=>h('div','footer SLOTS')})
        //************************************************************//
        //***************** With props {item=...} ********************//
        //************************************************************//
        // ------empty cases  --------
        // return () => h(WBC, { item: undefined });
        // return ()=>h(WBC,{item:null})
        // ------empty cases WITH SLOTS  --------
        // return ()=>h(WBC,{item:null},{header:()=>h('div','header SLOTS'),footer:()=>h('div','footer SLOTS')})
        // ------item_.value == 'boolean'--------
        // return () => h(WBC, { item: true });
        //----- with grlobal props-----
        // return () => h(WBC, { item: true, props: { style: { color: "red" } } });
        // return ()=>h(WBC,{item:!true})
        // return ()=>h(WBC,{item:true,wrap:'li'})
        // return () => h(WBC, { item: true, wrap: "input" }); //reactive v-model to the item
        //----- with grlobal props----
        let types = [
            "button",
            "checkbox",
            "color",
            "date",
            "datetime-local",
            "email",
            "hidden",
            "image",
            "month",
            "number",
            "password",
            "radio",
            "range",
            "reset",
            "search",
            "submit",
            "tel",
            "text",
            "time",
            "url",
            "week",
        ];
        return () =>
            types.map((e) => [
                h("div", { style: { backgroundColor: "grey" } }, `------- input with ${e} type------`),
                h(WBC, {
                    item: e,
                    wrap: "input",
                    props: { type: e, title: `title:type is ${e}` },
                }),
            ]);
        //reactive v-model to the item
        // ------item_.value == 'boolean' with SLOTS--------
        // return ()=>h(WBC,{item:true,wrap:'input'},{header:()=>h('div','header SLOTS'),footer:()=>h('div','footer SLOTS')})
        // return ()=>h(WBC,{item:true,wrap:'input'},{default:()=>h('div','default SLOTS OVERRIDED'),header:()=>h('div','header SLOTS'),footer:()=>h('div','footer SLOTS')})
        // ------item_.value == 'string'--------
        // return () => h(WBC, { item: "[[bla bla||https://stackoverflow.com]]" });
        // return ()=>h(WBC,{item:'bla bla', wrap:'li'})
        // return () => h(WBC, { item: "bla bla", wrap: "input" });
        //----- with grlobal props-----
        // return () =>
        //     h(
        //         WBC,
        //         {
        //             item: "bla bla",
        //             wrap: "li",
        //             props: { style: { color: "red", backgroundColor: "yellow" }, name: "name of ali baba" },
        //         }
        //     );
        // return () =>
        //     h(WBC, { props: { style: { color: "red", backgroundColor: "yellow" }, name: "ali baba" } }, "bla bla");
        // ------item_.value == 'number'--------
        // return () => h(WBC, { item: 99999 });
        // return ()=>h(WBC,{item:9999,wrap:'span'})
        // return () => h(WBC, { item: 9999, wrap: "input" });
        // ------item_.value is an ARRAY:ADJACENT case wrap without "~"--------
        // return () => h(WBC, { item: [true,true,true] })
        // return () => h(WBC, { item: [true,true,true,true],wrap:'input' })
        // return () => h(WBC, { item: [true, true, true, true], wrap: "div" });
        // return () => h(WBC, { item: ['111', '222', '3333'] ,wrap:'p'})
        // return () => h(WBC, { item: ['111', '222', '3333'] })
        // return () => h(WBC, { item: ['111', '222', '3333'] })
        // return () => h(WBC, { item: [111, 222, 3333] })
        // return () => h(WBC, { item: [222,true,111,false,123],wrap:'li' })
        // ------item_.value is an ARRAY:ADJACENT case wrap without "~"--------
        // return () => h(WBC, { item: [222,true,111,false,123],wrap:'li' },{header:()=>h('div','header SLOTS'),footer:()=>h('div','footer SLOTS')})
        //************************************************************//
        //***************** Nested Component ********************//
        //************************************************************//
        // return () => h(WBC, { item: [true,true,false],wrap:'input' })
        // return () => h(WBC, { item: ['bli','bla','blou'],wrap:'~div' })
        // return () => h(WBC, { item: [11111, 22222, 33333], wrap: "~li" });
        //----- with grlobal props-----
        // return () =>
        //     h(WBC, {
        //         item: [11111, 22222, 33333],
        //         wrap: "~li",
        //         props: { style: { color: "red", backgroundColor: "green" }, name: "ali baba" },
        //     });
        // return () => h(WBC, { item: [[[1111, [true]]]], wrap: "p" });
        // return () => h(WBC, { item: [true, 11111, 'bla bla', 'ali', 888]})
        // return () => h(WBC, { item: [true, 11111, "bla bla", [[["ali", 888]]]] }); // in absence case of wrap, [] has no effect
        // return () => h(WBC, { item: [true, 11111, 'bla bla', [[['ali', 888] ] ]], wrap: '~p' })
        // return () =>
        //     h(WBC, {
        //         item: [[[[[[11111, 222222, "3333333", 4444444, [[[["aaaa", "bbbbb", "ccccc"]]]]]]]]]],
        //         wrap: "li",
        //     });
        // return () => h(WBC, { item: [['ala ala'],'cla cla',false,'bla bla',[[[[[11111,222222,'3333333',4444444,['aaaa','bbbbb','ccccc']]]]]]],wrap:'~p' })
        // return () => h(WBC, { item: [true, 11111, 'bla bla', false], wrap: '~p' }, { header: () => h('div', 'header SLOTS'), footer: () => h('div', 'footer SLOTS') })
        // ************************************************************//
        // return () => h(WBC, { item: ["<~li>", true, 11111, "bla bla", "ali", 888] });
        // return () => h(WBC, { item: ["<li>", [true, 11111, "bla bla", "ali", 888]] });
        // return () => h(WBC, { item: [["<li>", true], ["<li>", 11111], "bla bla", "ali", 888] });
        /*        return () =>
            h(WBC, {
                item: [
                    [
                        1000,
                        ["<tr>", [11111, "bla bla", "ali", 888, "<td>"]],
                        ["<tr>", [11111, "bla bla", "ali", 888, "<td>"]],
                        ["77777", 88888888],
                    ],
                ],
            });*/

        /*        return () =>
            h(WBC, {
                item: ["<ol~>", ["<li>", 11111, "bla bla", "ali", 888]],
            });*/
        /*        return () =>
            h(WBC, {
                item: [[1000, ["<ol>", [11111, "bla bla", "ali", 888, "<li>"]], ["77777", 88888888]]],
            });*/
        //************************************************************//
        //***************** Object ********************//
        //************************************************************//
        // ------item_.value == 'object'--------
        /*return () => h(WBC, { item: { a: 100, b: 20 , c: 30, d: 40, e: 50 }, wrap: "~div" });*/
        // return () => h(WBC, { item: { a: 100, b: 20, c: 30, d: 40, e: [50,500,500] }, wrap: "~div" });
        // return () => h(WBC, { item: { a: 100, b: 20, c: 30, d: 40, e: [50, [[[[500, 5000]]]]] }, wrap: "div" });
        // return () => h(WBC, { item: { a: 100, b: 20, c: 30, d: 40, e: [50, [[[[500, 5000]]]]] }, wrap: "~div" });
        // return () => h(WBC, { item: { a: 100, b: 20, c: 30, d: 40, e: [50, [[[[500, 5000]]]]] }, wrap: "~div" });
        //     return () =>
        //         h(WBC, {
        //             item: { a: 100, b: 20, c: 30, d: 40, e: [50, [[[[500, 5000]]]]] },
        //             wrap: "div",
        //             props: { style: { color: "yellow", backgroundColor: "green" } },
        //         });
        ////////////////////////////////////////
        /*        // ------GWBC: item_ is BASIC 'object' with item.COMP is a STRING-AND props-------
        return () =>
            h(WBC, {
                item: {
                    comp: "div",
                    props: {
                        hide: !true,
                        key: "key-A",
                        name: "name-A",
                        html: "bla bla",
                        val: "",
                        style: { color: "red", backgroundColor: "green" },
                    },
                },
            });*/
        /*
        // ------GWBC: item_ is BASIC 'object' with item.COMP is a DIV-AND props and WBHtml string-------

        theItem.value = {
            comp: "div",
            props: {
                hide: !true,
                key: "key-A",
                name: "name-A",
                val: "",
                html: `[[stylish bla bla|{"style":{"color":"white"}}|aaaaaaaaaaaa]]`,
                style: { color: "green", backgroundColor: "red" },
            },
        };
*/

        /*        // ------GWBC: item_ is BASIC 'object' with item.COMP is a INPUT of type=TEXT and VModel to item.props.val--------
        theItem.value = {
            comp: "input",
            props: {
                hide: !true,
                key: "key-A",
                name: "name-A",
                type: "text",
                val: "",
                html: `[[stylish bla bla|{"style":{"color":"white"}}|aaaaaaaaaaaa]]`,
                style: { color: "green", backgroundColor: "red" },
            },
        };
        return () => [
            h(WBC, {
                item: theItem.value,
            }),
            `----${theItem.value.props.type}---->value=${theItem.value.props.val}`,
            h("br"),
        ];
*/
        /*
// ------GWBC: item_ is BASIC 'object' with item.COMP is a INPUT of type=checkbox and VModel to item.props.val--------
        theItem.value = {
            comp: "input",
            props: {
                hide: !true,
                key: "key-A",
                name: "name-A",
                type: "checkbox",
                val: "",
                html: `[[stylish bla bla|{"style":{"color":"white"}}|aaaaaaaaaaaa]]`,
                style: { color: "green", backgroundColor: "red" },
            },
        };
        return () => [
            h(WBC, {
                item: theItem.value,
            }),
            `----${theItem.value.props.type}---->value=${theItem.value.props.val}`,
            h("br"),
        ];*/
        /*
        // ------GWBC: item_ is BASIC 'object' with item.COMP is a INPUT of all types-AND vModel to item.props.val-------
        let types = [
            "button",
            "checkbox",
            "color",
            "date",
            "datetime-local",
            "email",
            "hidden",
            "image",
            "month",
            "number",
            "password",
            "radio",
            "range",
            "reset",
            "search",
            "submit",
            "tel",
            "text",
            "time",
            "url",
            "week",
        ];
        theItem.value = types.map((e) => ({
            comp: "input",
            props: {
                hide: !true,
                key: "key-A",
                name: "name-A",
                val: "",
                type: e,
                html: `[[it s ${e}-type|{"style":{"color":"white"}}|aaaaaaaaaaaa]]`,
                style: { color: "green", backgroundColor: "red" },
                value: "sssss",
            },
        }));

        return () =>
            theItem.value.map((e) => [
                h(WBC, {
                    item: e,
                }),
                `----${e.props.type}---->value=${e.props.val}`,
                h("br"),
            ]);


*/
        /*        // ------GWBC: item_ is BASIC 'object' with item.COMP is a LI --------
        theItem.value = {
            comp: "li",
            props: {
                title: "Example of video from samplelib.com",
                style: {
                    width: "50%",
                    height: "500",
                    border: "1px solid black",
                },
            },
        };
        return () => [
            h(WBC, {
                item: theItem.value,
            }),
            `----${theItem.value.props.type}---->value=${theItem.value.props.val}`,
            h("br"),
        ];*/

        /*
        // ------GWBC: item_ is BASIC 'object' with item.COMP is a VIDEO --------
        theItem.value = {
            comp: "video",
            props: {
                slotA: "<b>Title:</b> video-GWBC stylished with CSS: [[link||//samplelib.com/lib/preview/mp4/sample-5s.mp4]] ",
                slotZ: "All Rights Reserved [[©2021|red]] ",
                src: "//samplelib.com/lib/preview/mp4/sample-5s.mp4",
                title: "Example of video from samplelib.com",
                controls: true,
                style: {
                    width: "50%",
                    height: "500",
                    border: "1px solid black",
                },
            },
        };
        return () => [
            h(WBC, {
                item: theItem.value,
            }),

            h("br"),
        ];
*/
        /*
        // ------GWBC: item_ is BASIC 'object' with item.COMP is a IMAGE --------
        theItem.value = {
            comp: "img",
            props: {
                slotA: "<b>Title:</b> img-GWBC stylished with CSS: [[link||https://images.unsplash.com/photo-1660677668778-415e248707f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80]] ",
                slotZ: "All Rights Reserved [[©2021|red]] ",
                src: "https://images.unsplash.com/photo-1660677668778-415e248707f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80",
                title: "Example of image from unsplash.com",
                class: "red",
                style: {
                    width: "50%",
                    height: "500",
                    border: "1px solid black",
                },
            },
        };
        return () => [
            h(WBC, {
                item: theItem.value,
            }),

            h("br"),
        ];
*/
        /*
        // ------GWBC: item_ is BASIC 'object' with item.COMP is a frame --------
        theItem.value = {
            comp: "iframe",
            props: {
                slotA: "<b>Title:</b> iframe-GWBC of [[W3Schools||https://www.W3Schools.com]] ",
                slotZ: "All Rights Reserved [[©2021|red]] ",
                src: "https://www.W3Schools.com",
                title: "W3Schools Free Online Web Tutorials",
                class: "red",
                width: "50%",
                height: "500",
                style: "border:1px solid black;",
            },
        };
        return () => [
            h(WBC, {
                item: theItem.value,
            }),

            h("br"),
        ];
*/

        // ------GWBC: item_ is 'object' with COMP--------
        /*return () => h(WBC, { item: { comp: "a", a: 100, b: 20, c: 30, d: 40, e: 50 }, wrap: "~div" });*/
        /*
        // ------GWBC: item_ is 'object' with item.COMP is an ARRAY--------
        return () =>
            h(WBC, {
                item: {
                    comp: [[[[["a", "b"]]]]],
                    // comp: [["a"]],
                    // comp: ["a", "b", "c"],
                    // comp: [[[["a", "b"]]], "c", "d"],
                    props: { style: { color: "green" } },
                    a: "100",
                    b: "20",
                    c: "30",
                    d: "40",
                    e: "50",
                    wrap: "div",
                },
            });*/
        // ------GWBC: item_ is 'object' without item.COMP -------
        /*        return () =>
            h(WBC, {
                item: {
                    props: {
                        hide: false,
                        class: "clA",
                        key: "key-A",
                        name: "name-A",
                        style: { color: "red" },
                    },
                    a: 100,
                    b: 20,
                    c: 30,
                    d: 40,
                    e: 50,
                    wrap: "~li",
                },
            });*/
        /*        // ------GWBC: item_ is 'object' with item.COMP is an ARRAY-AND props-------
        return () =>
            h(WBC, {
                item: {
                    comp: ["a", "b", "c", "d"],
                    props: {
                        hide: false,
                        class: "clA",
                        key: "key-A",
                        name: "name-A",
                        style: { color: "red" },
                    },
                    a: 100,
                    b: 20,
                    c: 30,
                    d: 40,
                    e: 50,
                    wrap: "li",
                },
            });*/
        /*        // ------GWBC: item_ is 'object' with item.COMP is an ARRAY-AND props-------
        return () =>
            h(WBC, {
                item: {
                    comp: ["a", "b", "c", "d", "a", "b", "a", [[["a", "a", "a"]]]],
                    props: { hide: !true, key: "key-A", name: "name-A", style: { color: "red" } },
                    a: { a: 100 },
                    b: { b: 20 },
                    c: 30,
                    d: { comp: "li" },
                    e: 50,
                    wrap: "~div",
                },
            });*/

        // ------GWBC: item_ is 'object' with item.COMP is an ARRAY-AND props-------
        return () =>
            h(WBC, {
                item: {
                    comp: [["<~li>", ["a", "b"]], "c", "d"],
                    props: {
                        hide: false,
                        class: "clA",
                        key: "key-A",
                        name: "name-A",
                        style: { color: "blue" },
                    },
                    a: {
                        comp: "div",
                        props: {
                            // slotA: "<b>Title:</b> iframe-GWBC of [[W3Schools||https://www.W3Schools.com]] ",
                            // slotZ: "All Rights Reserved [[©2021|red]] ",
                            // src: "https://www.W3Schools.com",
                            // title: "W3Schools Free Online Web Tutorials",
                            width: "50%",
                            height: "500",
                            style: { backgroundColor: "red", border: "1px solid black" },
                        },
                    },
                    b: "20",
                    c: "30",
                    d: "40",
                    e: "50",
                    // wrap: "~li",
                },
            });
        ///////////////////////////////////////////////////////
        /*        // ------LIST OF GWBC: item_ is A LIST OF GWBC-------
        theItem.value = [
            {
                comp: "div",
                props: {
                    width: "50%",
                    height: "500",
                    style: { border: "1px solid black", color: "red" },
                    html: "div root",
                },
            },
            {
                comp: "div",
                props: {
                    class: "red",
                    width: "50%",
                    height: "500",
                    style: "border:1px solid black;",
                    html: "div root",
                },
            },
            {
                comp: "div",
                props: {
                    class: "red",
                    width: "50%",
                    height: "500",
                    style: "border:1px solid black;",
                    html: "div root",
                },
            },
        ];

        return () =>
            h(WBC, {
                item: theItem.value,
            });*/

        ///////////////////////////////////////////////////////
        /*        // ------LIST OF GWBC: item_ is A LIST OF GWBC-------
        theItem.value = [
            {
                comp: "div",
                props: {
                    slotA: "<b>Title:</b> iframe-GWBC of [[W3Schools||https://www.W3Schools.com]] ",
                    slotZ: "All Rights Reserved [[©2021|red]] ",
                    src: "https://www.W3Schools.com",
                    title: "W3Schools Free Online Web Tutorials",
                    class: "red",
                    width: "50%",
                    height: "500",
                    style: "border:1px solid black;",
                },
            },
            {
                comp: "iframe",
                props: {
                    slotA: "<b>Title:</b> iframe-GWBC of [[W3Schools||https://www.W3Schools.com]] ",
                    slotZ: "All Rights Reserved [[©2021|red]] ",
                    src: "https://www.W3Schools.com",
                    title: "W3Schools Free Online Web Tutorials",
                    class: "red",
                    width: "50%",
                    height: "500",
                    style: "border:1px solid black;",
                },
            },
            {
                comp: "iframe",
                props: {
                    slotA: "<b>Title:</b> iframe-GWBC of [[W3Schools||https://www.W3Schools.com]] ",
                    slotZ: "All Rights Reserved [[©2021|red]] ",
                    src: "https://www.W3Schools.com",
                    title: "W3Schools Free Online Web Tutorials",
                    class: "red",
                    width: "50%",
                    height: "500",
                    style: "border:1px solid black;",
                },
            },
        ];
        return () => [
            h(WBC, {
                item: theItem.value,
            }),

            h("br"),
        ];*/

        ////////////////////////////////////////////////////////////
    },
};
///////////////////////////The Vue APP named WBCApp/////////////////////////////

//creation of Vue APP named WBCApp
const WBCApp = createApp(objOfWbC);

// Mount Vue application to the element id
WBCApp.mount("#app");
