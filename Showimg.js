
"use strict";
!function () {
    const trans = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
    const BM = 30 // buffer margin 
    const maxz = 1000, minz = 50
    // ========================= global element var
    var ifdoc, holdst;
    var arrimg = [];
    var f_close, f_onop, f_index, f_play;
    var con;
    var optl, optm, fes, fef, opto, opti, bab, gob;
    var img, mimg
    var ind, last_ind, screen, autoplay, firstplay;
    var imd, imdt, imt, iml;
    var x, y, isclick;


    var istoch;
    var hypoth;
    var factor;
    var rect;
    var canmove;
    var DRM;
    var witchof;
    var is_ani_run;
    var iframe;
    var utls;
    var length;
    var checkdbl
    var hide_tool_time
    var timer_check
    var is_visible_tool = true
    var onmoves = {}
    var stram_last_blob
    var updateSource_lct
    var updateSource_tout
    var updateSource_playble
    function onmove(e, ...f) {
        onmoves[e] = f
    }
    window.Showimg = function (obj = {}) {

        var styles = ""
        f_close = obj.onclose
        f_onop = obj.onoption
        f_index = obj.onindex
        f_play = obj.onplay
        autoplay = obj.autoplay
        DRM = new dragMomentum_f()
        length = 0
        utls = []
        imd = 100, imdt = 100, imt = 0, iml = 0;

        if (typeof obj.screen == "function")
            screen = obj.screen;

        if (typeof obj.index == "number")
            ind = obj.index;
        else
            ind = 0
        firstplay = ind
        if (typeof obj.inputs == "object") {
            arrimg = Array.from(obj.inputs).slice();
            length = arrimg.length
            if ((!f_index || !f_play) && length == 1) {
                styles += ".bab,.gob{display:none!important}"
            }
        } else {
            arrimg = []
        }
        holdst = document.createElement('style');
        // holdst.innerHTML = "body>*:not(#Showimg){display:none}"
        document.querySelector('head').appendChild(holdst);
        iframe = document.createElement('div');
        iframe.id = "Showimg";
        iframe.style = "top:0;left:0;width:50%;height:100%;position:absolute;direction: ltr;z-index:10000;";

        if (typeof iframe.attachShadow != "undefined") {
            ifdoc = iframe.attachShadow({ mode: 'closed' })
        } else {
            ifdoc = iframe.createShadowRoot();
        }
        // loading
        styles += `.loading+.con+.ploading,.loading+.con+.ploading::after{animation-fill-mode:both;animation-iteration-count:infinite;animation-timing-function:linear;pointer-events:none}body,html{margin:0;background:linear-gradient(-45deg,#ff8500,#f900a0)}.loading+.con+.ploading{--size:.5;mix-blend-mode:lighten;filter:contrast(calc(var(--size) * 20));position:absolute;background:#000;width:100px;height:100px;z-index:9;overflow:hidden;top:50%;left:50%;animation-duration:8s;animation-name:rotate}.loading+.con+.ploading::before{content:"";background:#fff;filter:blur(10px);position:absolute;top:10%;left:10%;width:80%;height:80%;border-radius:50%}.loading+.con+.ploading::after{content:"";border-radius:15000px;width:25%;padding-top:50%;left:23px;bottom:54px;position:absolute;animation-duration:6s;animation-name:spin;background:inherit;filter:blur(5px)}@keyframes rotate{from{transform:translate(-50px,-50px) scale(var(--size)) rotate(0)}to{transform:translate(-50px,-50px) scale(var(--size)) rotate(360deg)}}@keyframes spin{0%{transform:rotate(0) scale(2,1.5) translate(0,25px)}25%{transform:rotate(270deg) scale(2) translate(0,20px)}50%{transform:rotate(540deg) scale(1.5,1) translate(5px,15px)}75%{transform:rotate(810deg) scale(1,3) translate(0,15px)}100%{transform:rotate(1080deg) scale(2,1.5) translate(0,25px)}}`
        ifdoc.innerHTML = `<style>${styles}.opto{top:2px;vertical-align:middle}*{position:relative}body,html{width:100%;height:100%;margin:0}.main{width:100%;font-family:sans-serif;height:100%;position:absolute;overflow:hidden;box-sizing:border-box;background-color:#000;display:flex;flex-flow:column;user-select:none}.imgsh>div{user-drag:none;-webkit-user-drag:none;display:none;position:absolute;width:100%;height:100%;object-fit:contain}.imgsh>div>*{user-drag:none;-webkit-user-drag:none;width:100%;height:100%;object-fit:contain}.imgsh{height:100%;overflow:hidden;background-size:contain;background-repeat:no-repeat;background-position:center}img{pointer-events:none}.con{--t:0;--p:0;display:none;}.con:after{content:"";width:100%;height:0px;left:0;bottom:0;z-index:-1;position:absolute;box-shadow: 0px -17px 124px 55px #060606f0;}.hidec .con{display:none!important}.pause+.con,.play+.con{height:auto;bottom:0;position:absolute;width:100%;z-index:2;display:flex;align-items:center;flex-direction:row-reverse;color:#fff;padding:15px 20px;box-sizing:border-box}.con_t{padding:3px 15px}.pause+.con .con_p,.play+.con .con_p{position:relative;display:block;content:"";box-sizing:content-box;top:0;height:5px;touch-action:none;right:0;width:10px;flex:1;padding:9px 0;background-image:linear-gradient(to right,#fff var(--t),#999 var(--t) var(--p),#555 var(--p));background-clip:content-box;z-index:100}.pause+.con .con_p:after,.play+.con .con_p:after{content:"";width:15px;height:15px;background:#fff;border-radius:100px;top:4px;position:absolute;z-index:10;left:var(--t);margin-left:-7px}.opt{padding:8px 6px;box-sizing:border-box;max-height:100px;transition:.15s;color:#fff;font-size:20px;top:0;position:absolute;width:100%;z-index:2;}.opt:after{content:"";width:100%;height:0px;top:0;left:0;z-index:-1;position:absolute;box-shadow: 0px -17px 124px 55px #060606f0;}.con_f{background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='%23e8eaed'%3E%3Cpath d='M200-200h80q17 0 28.5 11.5T320-160q0 17-11.5 28.5T280-120H160q-17 0-28.5-11.5T120-160v-120q0-17 11.5-28.5T160-320q17 0 28.5 11.5T200-280v80Zm560 0v-80q0-17 11.5-28.5T800-320q17 0 28.5 11.5T840-280v120q0 17-11.5 28.5T800-120H680q-17 0-28.5-11.5T640-160q0-17 11.5-28.5T680-200h80ZM200-760v80q0 17-11.5 28.5T160-640q-17 0-28.5-11.5T120-680v-120q0-17 11.5-28.5T160-840h120q17 0 28.5 11.5T320-800q0 17-11.5 28.5T280-760h-80Zm560 0h-80q-17 0-28.5-11.5T640-800q0-17 11.5-28.5T680-840h120q17 0 28.5 11.5T840-800v120q0 17-11.5 28.5T800-640q-17 0-28.5-11.5T760-680v-80Z'/%3E%3C/svg%3E") no-repeat center center / contain;padding:0!important;}.full .con_f{background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='%23e8eaed'%3E%3Cpath d='M240-240h-80q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h120q17 0 28.5 11.5T320-280v120q0 17-11.5 28.5T280-120q-17 0-28.5-11.5T240-160v-80Zm480 0v80q0 17-11.5 28.5T680-120q-17 0-28.5-11.5T640-160v-120q0-17 11.5-28.5T680-320h120q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240h-80ZM240-720v-80q0-17 11.5-28.5T280-840q17 0 28.5 11.5T320-800v120q0 17-11.5 28.5T280-640H160q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h80Zm480 0h80q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H680q-17 0-28.5-11.5T640-680v-120q0-17 11.5-28.5T680-840q17 0 28.5 11.5T720-800v80Z'/%3E%3C/svg%3E") no-repeat center center / contain;}.opt svg,.con_f{padding:15px;padding-right:20px;fill:#fff;width:30px;height:30px;vertical-align:middle}@media only screen and (max-width:900px){.opt svg,.con_f{width:24px;height:24px;padding-right:15px}.opt{font-size:17px}.optl{right:15px!important}}.optm{float:right}.loading:before,.pause:after,.pause:before{z-index:1;content:"";position:absolute;width:70px;height:70px;display:flex;top:50%;left:50%;transform:translate(-50%,-50%);border-radius:100px}.loading:before,.pause:before{background:#3339}.pause:not(.loading):after{background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23fff' class='st0' d='M4,12V8.4c0-4.4,3.1-6.2,7-4l3.1,1.8L17.1,8c3.8,2.2,3.8,5.8,0,8l-3.1,1.8L11,19.6c-3.8,2.2-7,0.4-7-4V12z'/%3E%3C/svg%3E") center/35px no-repeat;margin-left:2px}.hidec .bab,.hidec .gob{width:0!important}.hidec .bab{padding-left:0!important}.hidec .opt{overflow:hidden;padding:0!important;max-height:0!important}.optl{background:rgba(51,51,51,0.94);color:#c1c1c1;border-radius:5px;position:absolute;display:inline-block;right:23px;top:13px;z-index:3;transition:150ms;max-height:0;overflow-y:auto;scrollbar-width:none}.optl::-webkit-scrollbar{display:none}.optl div{padding:8px 18px}.optl div:hover{background:rgba(85,85,85,0.94)}.bab,.gob{width:180px;height:320px;top:50%;-ms-transform:translateY(-50%);transform:translateY(-50%);position:absolute;display:none;background:rgba(0,0,0,0);z-index:2;border-radius:100%;transition:.2s;box-sizing:border-box}.gob{right:-110px;padding-left:20px}.bab{left:-110px;padding-left:110px}.bab>svg,.gob>svg{transition:.2s;height:320px;width:50px;fill:#b5b5b5}.bab:after,.gob:after{content:"";width:50px;height:100%;z-index:-1;position:absolute;border-radius:100%;transition:.25s;}.gob:after{box-shadow:-40px 0px 170px 70px #333;right:-300px}.bab:after{left:-300px;box-shadow:40px 0px 170px 70px #333}.gob:hover:after{right:0}.bab:hover:after{left:0px;}.gob:hover svg,.bab:hover svg{fill:#fff}.hid:hover svg{fill:red!important}.gob.hid:after{box-shadow:-40px 0px 170px 70px red;}.bab.hid:after{box-shadow:40px 0px 170px 70px red}@media(pointer:fine){.bab,.gob{display:block}}</style><div class=main><div class=opt><svg class=optba viewBox="0 0 24 24"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg><span class=opto><span class=opti>4</span> of <span class=optt>25</span></span><svg viewBox="0 0 24 24"class=optm><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg><div class=optl></div></div><div class=bab><svg viewBox="0 0 24 24"><path d="M14.71 6.71c-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L10.83 12l3.88-3.88c.39-.39.38-1.03 0-1.41z"></path></svg></div><div class=gob><svg viewBox="0 0 24 24"><path d="M9.29 6.71c-.39.39-.39 1.02 0 1.41L13.17 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"></path></svg></div><div class=imgsh></div><div class=con><div class=con_f></div><div class=con_t>00:00 / 00:00</div><div id=con_p class=con_p></div></div><div class=ploading></div></div>`
        document.body.insertAdjacentElement('afterbegin', iframe);

        styles = ""

        fes = $(".main");
        fef = $(".imgsh");
        con = $(".con");
        opto = $(".opto");
        opti = $(".opti");
        optm = $(".optm");
        optl = $(".optl");
        bab = $(".bab");
        gob = $(".gob");

        fes.addEventListener("contextmenu", f_context);
        fes.addEventListener("mousemove", f_msmove);
        fes.addEventListener("mouseup", f_tend);
        fes.addEventListener("mouseleave", f_moseup);


        fef.addEventListener('wheel', f_scroll);
        fef.addEventListener("mousedown", f_msdown);
        // touch event
        fef.addEventListener("touchstart", f_tstart, { passive: true });
        fef.addEventListener("touchmove", f_tmove, { passive: true });
        fef.addEventListener("touchend", f_tend, { passive: true });
        fef.addEventListener("dblclick", f_doblc);

        optm.addEventListener("mouseover", f_opts);
        optm.addEventListener("mouseout", f_opth);
        optl.addEventListener("mouseover", f_opts);
        optl.addEventListener("mouseout", f_opth);
        optl.addEventListener("click", callop);
        con.children[0].addEventListener("click", full_toggle);

        bab.addEventListener('click', f_back);
        gob.addEventListener("click", f_go);
        $(".optba").addEventListener("click", ShowimgClose);

        //  ============================
        if (typeof obj.title == "string") {
            opto.innerHTML = obj.title
        } else
            $(".optt").innerHTML = length;

        if (typeof obj.option == "object") {
            var opts = ""
            for (var i in obj.option) {
                opts += '<div d="' + i + '">' + obj.option[i] + '</div>'
            }
            optl.innerHTML = opts;
            opts = "";
        }
        window.addEventListener("keydown", f_key)

        //  ============================
        opti.innerHTML = ind + 1;
        fef.innerHTML = creaste_string(arrimg[ind]);
        img = fef.children[0]
        mimg = img.children[0]
        img.id = "I" + ind
        refresh_item()
        f_index && f_index(ind, ind, null)
        f_play && f_play(ind)
        add_element()
        add_element(true)
        img.style.display = "inline-block";
        if (img.pause) {
            fef.classList.add("loading")
            img.play().catch(onerror.bind(mimg))
            fef.classList.remove("pause")
            fef.classList.add("play")
            firstplay = undefined
        }
        hide_timer()
        //=============================================== mouse video control

        var is_down = false
        var targer_id = false
        window.addEventListener("pointerup", clear)
        fes.addEventListener("mouseleave", clear)
        fes.addEventListener("pointermove", move)
        fes.addEventListener("pointerdown", set)

        function set(e) {
            if (!is_down && e.target.id in onmoves) {
                if (onmoves[e.target.id][1] && onmoves[e.target.id][1](e) === false)
                    return
                is_down = e.target
                targer_id = e.target.id
                e.target.style.touchAction = "none"
                move(e)
            }
        }
        function clear(e) {
            if (targer_id) {
                onmoves[targer_id][2] && onmoves[targer_id][2](e)
                is_down = false
                targer_id = false
            }
        }
        function move(e) {
            if (targer_id && targer_id in onmoves) {
                onmoves[targer_id][0].call(is_down, e)
            }
        }
        onmove("con_p", function (e) {
            mimg.currentTime = ((e.offsetX) / this.offsetWidth) * (mimg.duration || 0)
            con.style.setProperty("--t", (((e.offsetX) / e.target.offsetWidth) * 100) + "%");
            con.children[1].innerText = seccond_format(mimg.currentTime * 1000) + " / " + seccond_format(mimg.duration * 1000)
            if (!timer_check) {
                hide_timer()
            }
        })
    }
    function ontimeupdate(e) {
        const bm = this.stram_bufferd == 1000 ? 0 : BM
        // console.log("inter")
        // wile changing source currentTime is zero 
        if (!this.currentTime == 0) {
            // console.log(stram_last_blob, this.currentTime / (this.duration || 1) * 1000, this.stram_bufferd - bm)

            if (stram_last_blob && this.currentTime / (this.duration || 1) * 1000 > this.stram_bufferd - bm) {
                if (!fef.classList.contains("loading"))
                    fef.classList.add("loading")

                if (this.currentTime != this.duration || this.duration == 0)
                    updateSource_playble = true
                updateSource(this, fef)

                if (this.currentTime == this.duration) {
                    if (this.stram_bufferd - bm > 0) {
                        this.currentTime = 0
                    }
                }
                return
            } else {
                if (fef.classList.contains("loading")) {
                    fef.classList.remove("loading")
                }
                updateSource_playble = false
            }
        } else if (fef.classList.contains("play") && !fef.classList.contains("loading")) {
            fef.classList.add("loading")
        }
        if ((this.currentTime == this.duration || this.stram_bufferd == 0) && fef.classList.contains("play")) {
            // console.log("play")
            this.play()
        }
        // if (this.stram_bufferd != 0 && this.currentTime == 0)
        //     return
        con.children[1].innerText = seccond_format(this.currentTime * 1000) + " / " + seccond_format((this.duration || 0) * 1000)
        con.style.setProperty("--t", (this.currentTime / (this.duration || 1) * 100) + "%");
    }

    function seccond_format(ms) {
        return Math.floor(ms / 60000) + ":" + Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    }
    function updateSource(video, play) {
        const time = parseInt(new Date().getTime() / 1000)
        if (time < updateSource_lct + 2) {
            video.pause();
            if (updateSource_tout)
                return
            updateSource_tout = setTimeout(updateSource.bind(null, video, play), (updateSource_lct + 3 - time) * 1000);
            return
        }
        if (video != mimg)
            return

        updateSource_tout = undefined
        updateSource_lct = time
        video.pause();

        const link = URL.createObjectURL(stram_last_blob);
        utls && utls.push(link);
        video.stram_bufferd = parseInt(stram_last_blob.size / stram_last_blob.total * 1000)

        const currentTime = video.currentTime;
        function after_blob() {
            video.onloadeddata = function () {
                video.onloadeddata = undefined
                video.currentTime = currentTime;
                video.oncanplaythrough = function () {
                    video.oncanplaythrough = undefined
                    video.style.visibility = null;
                    if (play.classList.contains("play")) {
                        video.play();
                    }
                }
            };
            video.style.visibility = 'hidden';
            video.src = link;
        }
        if (!updateSource_playble) {
            after_blob()
        } else {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(blob => {
                if (blob) {
                    const frameURL = URL.createObjectURL(blob);
                    utls && utls.push(frameURL);
                    video.parentNode.style.background = `url(${frameURL}) no-repeat center center / contain`;
                    setTimeout(after_blob, 50);
                } else
                    setTimeout(after_blob, 50);
            });
        }
    }


    window.ShowimgUpdate = function (el_ind, e, t) {
        el_ind = +el_ind
        var el = fef.querySelector("#I" + el_ind)
        if (!el)
            return false
        if (e === true) {
            if (t)
                el.style.background = `url(${t}) no-repeat center center / contain`
            refresh_item()
            return
        }
        if (!e) {
            if (!el.nextElementSibling)
                gob.classList.add("hid")
            if (!el.previousElementSibling)
                bab.classList.add("hid")
            el.remove()
        } else if (e instanceof Blob) {
            if (!e.total)
                e.total = e.size
            var tag = e.type && e.type.startsWith("video") ? "VIDEO" : "IMG"
            var mel = el.children[0]
            if (mel.tagName !== tag) {
                var newel = document.createElement(tag)
                if (img == el)
                    mimg = newel
                mel.replaceWith(newel)
                mel = newel
            }
            const has_src = !!mel.src
            const is_main_video = mel.tagName == "VIDEO" && img == el
            // its friest time  
            if (!(is_main_video && has_src)) {
                const url = URL.createObjectURL(e)
                utls.push(url)
                mel.src = url
                mel.volume = .1
                if (mel.tagName == "VIDEO") {
                    mel.stram_bufferd = parseInt(e.size / e.total * 1000)
                } else { 
                    refresh_item()
                }
            }
            if (is_main_video) {
                if (!has_src) {
                    if (firstplay == el_ind) {
                        firstplay = undefined
                        fef.classList.add("play")
                        fef.classList.remove("pause")
                    }
                    refresh_item()
                }

                stram_last_blob = e

                con.style.setProperty("--p", parseInt(e.size / e.total * 100 - BM / 10) + "%");

                if (e.size == e.total)
                    con.style.setProperty("--p", null);
            }
        }
    }

    function add_element(next) {
        const index = next ? ind + 1 : ind - 1
        if (arrimg[index] || f_index) {
            fef.insertAdjacentHTML(next ? 'beforeend' : 'afterbegin', creaste_string(arrimg[index], next ? ' style="left:100%;top:0%;"' : ' style="left:-100%;top:0%;"'));
            (next ? img.nextElementSibling : img.previousElementSibling).id = "I" + index
            f_index && f_index(index, ind, last_ind)
        } else {
            if (next)
                gob.classList.add("hid")
            else
                bab.classList.add("hid")
        }
    }
    function creaste_string(data, add = '') {
        if ((typeof data == "string" && data.slice(-4) == ".mp4") || (typeof data == "object" && data.type && data.type.startsWith("video"))) {
            if (typeof data == "object") {
                data = URL.createObjectURL(data)
                utls.push(data)
            }
            return '<div ' + add + '><video src="' + data + '"></video></div>'
        } else {
            if (typeof data == "object") {
                data = URL.createObjectURL(data)
                utls.push(data)
            }
            return '<div ' + add + '><img src="' + (data || trans) + '"></div>'
        }
    }
    function onerror(e = {}) {
        if (e.code == 9) {
            this.removeAttribute('src')
        }
    }
    function refresh_item(last) {
        if (!mimg.src || mimg.src == trans) {
            fef.classList.add("loading")
        } else {
            fef.classList.remove("loading")
        }

        if (last && last.pause) {
            last.ontimeupdate = undefined
            last.ondurationchange = undefined
            stram_last_blob = undefined
            last.pause();
            fef.classList.remove("pause")
            fef.classList.remove("play")
        }
        if (mimg.pause) {
            mimg.pause();
            con.style.setProperty("--p", '0%');
            con.style.setProperty("--t", '0%');
            mimg.ontimeupdate = ontimeupdate
            mimg.ondurationchange = ontimeupdate
            mimg.onerror = function (e) { mimg.onerror = undefined; this.removeAttribute('src') }
            if (last) {
                fef.classList.remove("pause")
                fef.classList.remove("play")
                if (autoplay) {
                    fef.classList.add("play")
                } else {
                    fef.classList.add("pause")
                }
            }
            if (fef.classList.contains("play")) {
                mimg.play().catch(onerror.bind(mimg))
            }
            ontimeupdate.call(mimg)
        }
    }
    function main_click(e) {
        if (!fef.classList.contains("loading")) {
            if (!e && fes.classList.contains("hidec")) {
                hide_timer()
            } else if (fef.classList.contains("pause")) {
                fef.classList.remove("pause")
                fef.classList.add("play")
                if (!autoplay && f_play && !img.classList.contains("autoplay")) {
                    img.classList.add("autoplay")
                    fef.classList.add("loading")
                    f_play(ind)
                    refresh_item()
                }
                mimg.play().catch(onerror.bind(mimg))
                hide_timer()
            } else if (mimg.pause) {
                mimg.pause()
                fef.classList.add("pause")
                fef.classList.remove("play")
                hide_timer()
            }
        } else if (!mimg.pause) {
            hide_tool()
        }
    }
    function hide_timer() {
        if (!is_visible_tool && mimg.paused != undefined)
            hide_tool(true)
        timer_check = true
        setTimeout(function () {
            timer_check = false
            if (mimg.paused === false)
                hide_tool_time = setTimeout(hide_tool.bind(null, false), 1200);
            else {
                clearTimeout(hide_tool_time)
                hide_tool_time = undefined
            }
        }, 200);
        if (hide_tool_time) {
            clearTimeout(hide_tool_time)
            hide_tool_time = undefined
        }
    }

    function f_go() {
        if (img.nextElementSibling) {
            last_ind = ind
            ++ind;
            opti.innerHTML = ind + 1;
            img.style.left = "-100%";
            img.style.display = "none"
            f_rsf()
            const last = mimg
            img = img.nextElementSibling;
            mimg = img.firstElementChild;
            img.style.display = "inline-block"
            img.style.transition = "left 200ms,top 200ms";
            setTimeout(function () {
                img.style.left = "0%";
            }, 50);
            if (fef.children.length >= 3) {
                fef.children[0].remove();
            }
            bab.classList.remove("hid")
            add_element(true)
            refresh_item(last)
            autoplay && f_play && f_play(ind)
        }
    }
    function f_back() {
        if (img.previousElementSibling) {
            last_ind = ind
            --ind;
            opti.innerHTML = ind + 1;
            img.style.left = "100%";
            img.style.display = "none"
            f_rsf()
            const last = mimg
            img = img.previousElementSibling;
            mimg = img.firstElementChild;
            img.style.display = "inline-block"
            img.style.transition = "left 200ms,top 200ms";
            setTimeout(function () {
                img.style.left = "0%";
            }, 50);
            if (fef.children.length >= 3) {
                fef.children[fef.children.length - 1].remove();
            }
            gob.classList.remove("hid")
            add_element()
            refresh_item(last)
            autoplay && f_play && f_play(ind)
        }
    }
    function f_key(e) {
        if (e.keyCode == 39)
            f_go()
        else if (e.keyCode == 37)
            f_back()
        else if (e.keyCode == 32)
            main_click(true)
    }
    function $(a) {
        return ifdoc.querySelector(a);
    }
    function f_opts() {
        optl.style.maxHeight = "300px";
    }
    function f_opth() {
        optl.style.maxHeight = "0px";
    }
    function callop(e) {
        var at = e.target.attributes.d
        if (typeof at != "undefined") {
            f_opth()
            if (typeof f_onop == "function")
                f_onop(Number(at.value), ind);
        }
    }
    function dragMomentum_f() {
        this.ME = []
        var ME = this.ME
        var ani;
        var minDistance = 10;
        // change this for greater or lesser momentum 
        // var easeType = 'easeOutBack';
        this.move = function (x, y, t, force) {
            if (force || (t - ME[ME.length - 1].t > 40)) {
                ME.push({ x, y, t });
                if (ME.length > 2) {
                    ME.shift();
                }
            }
        }
        this.start = function (Xa, Ya, Ta) {
            this.move(Xa, Ya, Ta, true)
            this.move(Xa, Ya, Ta, true)
            if (ani) {
                is_ani_run = 0
                ani()
            }
        };
        this.end = function (elmnt, x2, y2, t2) {
            if (!ME[0])
                return;
            var lastE = ME.shift();
            var x1 = lastE.x;
            var y1 = lastE.y;
            var t1 = lastE.t;

            var dMs = Math.max(t2 - t1, 1);
            // Speeds
            var speedX = Math.max(Math.min((x2 - x1) / dMs, 1), -1),
                speedY = Math.max(Math.min((y2 - y1) / dMs, 1), -1);
            var distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
            if (distance > minDistance) {
                // Momentum
                distance /= 3.5

                var bor = get_image_border()
                var ofw = Math.max(img.offsetWidth * 100 / fef.offsetWidth, 100)
                var ofh = Math.max(img.offsetHeight * 100 / fef.offsetHeight, 100)
                bor[0] = Math.min((bor[0] * ofw / 100), (ofw - 100) / 2)
                bor[1] = Math.min((bor[1] * ofh / 100), (ofh - 100) / 2)
                is_ani_run = (new Date().getTime()) + 50 + Math.max(Math.abs(speedX), Math.abs(speedY)) * 2000
                ani = animate(function (currentStep) {
                    if (Math.abs(speedX) > .02 && Math.abs(speedX) > .02) {
                        speedX *= (currentStep);
                        speedY *= (currentStep);
                        iml = Math.min(Math.max((elmnt.offsetLeft + (speedX * distance)) * 100 / fef.offsetWidth, - (ofw - 100 - bor[0])), -bor[0])
                        imt = Math.min(Math.max((elmnt.offsetTop + (speedY * distance)) * 100 / fef.offsetHeight, - (ofh - 100 - bor[1])), -bor[1])

                        elmnt.style.left = iml + "%";
                        elmnt.style.top = imt + "%";
                    }
                }, Math.max(Math.abs(speedX), Math.abs(speedY)) * 2000);
            }
        };
        function animate(cb, dur) {
            var st = -1
            function step(s) {
                if (st == -1)
                    st = s
                s = s - st
                if (s <= dur) {
                    window.requestAnimationFrame(step);
                    cb(1 - (s / dur), s)
                } else {
                    cb(0, dur)
                }
            }
            window.requestAnimationFrame(step);
            return function () {
                st = dur + 1;
            }
        }
    };
    function f_context(e) {
        if (e.cancelable)
            e.preventDefault()
    }
    window.ShowimgClose = function () {
        window.removeEventListener("keydown", f_key);
        holdst.remove();
        iframe.remove();
        utls && utls.forEach(URL.revokeObjectURL);
        clearTimeout(updateSource_tout)
        arrimg = undefined
        utls = undefined
        if (typeof f_close == "function")
            f_close()
    }
    function f_doblc(e) {
        clearTimeout(checkdbl)
        img.style.transition = "left 300ms,top 300ms";
        if (img.offsetWidth > fef.offsetWidth) {
            img.style.left = "0%";
            f_rsf()
        } else {
            var rect = fef.getBoundingClientRect();
            var elx = (e.pageX - rect.left) * 100 / fef.offsetWidth;
            var ely = (e.pageY - rect.top) * 100 / fef.offsetHeight;
            var imdl = imd;
            imd = 300
            imdt = imd

            imt = (imt - ely) / imdl * imd + ely;
            iml = (iml - elx) / imdl * imd + elx;


            var bor = get_image_border()

            // ==============     make percent    == if not full sceen
            bor[0] = Math.min((bor[0] * imd / 100), (imd - 100) / 2)
            bor[1] = Math.min((bor[1] * imd / 100), (imd - 100) / 2)

            iml = Math.min(Math.max(iml, - (imd - 100 - bor[0])), -bor[0])
            imt = Math.min(Math.max(imt, - (imd - 100 - bor[1])), -bor[1])


            img.style.top = imt + "%";
            img.style.left = iml + "%";

            img.style.width = imd + "%";
            img.style.height = imd + "%";
        }
    }
    function f_rsf() {
        imd = 100, imdt = 100, imt = 0, iml = 0;
        img.style.top = imt + "%";
        img.style.width = imd + "%";
        img.style.height = imd + "%";
    }
    function f_msdown(e) {
        img.style.transition = "none"
        DRM.start(e.clientX, e.clientY, e.timeStamp)
        isclick = true;
        x = e.pageX - img.offsetLeft;
        y = e.pageY - img.offsetTop;
        canmove = img.offsetHeight > fef.offsetHeight
        repare_vars()
    }
    function f_msmove(e) {
        if (isclick) {
            DRM.move(e.clientX, e.clientY, e.timeStamp);
            img.style.left = (e.pageX - x) + 'px';
            if (canmove)
                img.style.top = (e.pageY - y) + 'px';
        } else if (!timer_check && window.matchMedia("(pointer: fine)").matches) {
            hide_timer()
        }
    }
    function f_moseup() {
        img.style.transition = "left 300ms,top 300ms";
        // ==================================================== by px
        // var ofw = Math.max(img.offsetWidth, fef.offsetWidth)
        // var ofh = Math.max(img.offsetHeight, fef.offsetHeight)
        // var oft = Math.min(Math.max(img.offsetTop, - (ofh - fef.offsetHeight)), 0)
        // var ofl = Math.min(Math.max(img.offsetLeft, - (ofw - fef.offsetWidth)), 0)

        var bor = get_image_border()
        var ofw = Math.max(img.offsetWidth * 100 / fef.offsetWidth, 100)
        var ofh = Math.max(img.offsetHeight * 100 / fef.offsetHeight, 100)

        var ofl = img.offsetLeft * 100 / fef.offsetWidth
        var oft = img.offsetTop * 100 / fef.offsetHeight
        // =============== cehck max zoom
        if (ofw > maxz) {
            ofl = ((ofl - 50) / ofw * maxz) + 50;
            oft = ((oft - 50) / ofh * maxz) + 50;
            ofw = maxz;
            ofh = maxz;
        }

        // ==============     make percent    == if not full sceen
        bor[0] = Math.min((bor[0] * ofw / 100), (ofw - 100) / 2)
        bor[1] = Math.min((bor[1] * ofh / 100), (ofh - 100) / 2)

        ofl = Math.min(Math.max(ofl, - (ofw - 100 - bor[0])), -bor[0])
        oft = Math.min(Math.max(oft, - (ofh - 100 - bor[1])), -bor[1])

        if (istoch) {
            istoch = false;
        }
        if (isclick) {
            // move slide
            isclick = false;
            if (img.offsetLeft > 0) {
                if (img.offsetLeft / fef.offsetWidth > 0.15 && ind != 0) {
                    img.style.transition = "none"
                    return f_back();
                }
            } else if (img.offsetLeft + img.offsetWidth < fef.offsetWidth) {
                if ((img.offsetLeft + img.offsetWidth) / fef.offsetWidth < .85 && length != ind + 1) {
                    img.style.transition = "none"
                    return f_go()
                }
            }
        }
        imt = oft
        iml = ofl
        img.style.top = oft + "%";
        img.style.left = ofl + "%";

        imd = ofw
        imdt = ofw
        img.style.width = ofw + "%";
        img.style.height = ofh + "%";
    }
    function get_image_border() {
        var spus = fef.offsetWidth * (mimg.naturalHeight || mimg.videoHeight) / (mimg.naturalWidth || mimg.videoWidth)
        if (spus > fef.offsetHeight)
            return [((fef.offsetWidth - (fef.offsetHeight * (mimg.naturalWidth || mimg.videoWidth) / (mimg.naturalHeight || mimg.videoHeight))) * 100 / fef.offsetWidth) / 2, 0]
        else
            return [0, ((fef.offsetHeight - spus) * 100 / fef.offsetHeight) / 2]
    }
    function f_tend(e) {
        if (isclick) {
            if (DRM.ME.length == 2 &&
                Math.abs(DRM.ME[0].x - DRM.ME[1].x) < 3 &&
                Math.abs(DRM.ME[0].y - DRM.ME[1].y) < 3) {
                clearTimeout(checkdbl)
                checkdbl = setTimeout(main_click.bind(null, window.matchMedia("(pointer: fine)").matches, e.target), 250);
            }
            var bor = get_image_border()
            var ofw = Math.max(img.offsetWidth * 100 / fef.offsetWidth, 100)
            var ofh = Math.max(img.offsetHeight * 100 / fef.offsetHeight, 100)
            // ==============     make percent    == if not full sceen
            bor[0] = Math.min((bor[0] * ofw / 100), (ofw - 100) / 2)
            bor[1] = Math.min((bor[1] * ofh / 100), (ofh - 100) / 2)

            var ofl = img.offsetLeft * 100 / fef.offsetWidth
            var oft = img.offsetTop * 100 / fef.offsetHeight


            if (oft < -bor[1] && oft > (- (ofh - 100 - bor[1])) &&
                ofl < -bor[0] && ofl > (- (ofw - 100 - bor[0]))) {
                DRM.end(img,
                    e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
                    e.changedTouches ? e.changedTouches[0].clientY : e.clientY,
                    e.timeStamp);
                isclick = false;
                return;
            }
            f_moseup()
        } else if (istoch) {
            f_moseup()
        }
    }
    function f_tstart(e) {
        istoch = e.touches.length == 2;
        if (istoch) {
            isclick = false;
            hypoth = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
            rect = fef.getBoundingClientRect();
            x = (((e.touches[0].pageX + e.touches[1].pageX) / 2) - rect.left) * 100 / fef.offsetWidth;
            y = (((e.touches[0].pageY + e.touches[1].pageY) / 2) - rect.top) * 100 / fef.offsetHeight;

            factor = (fef.offsetWidth * (mimg.naturalWidth || mimg.videoWidth) / (mimg.naturalHeight || mimg.videoHeight) > fef.offsetHeight) ? img.offsetHeight : img.offsetWidth

            witchof = (fef.offsetWidth * (mimg.naturalWidth || mimg.videoWidth) / (mimg.naturalHeight || mimg.videoHeight) > fef.offsetHeight) ? fef.offsetHeight : fef.offsetWidth
        } else {
            img.style.transition = "none"
            DRM.start(e.touches[0].clientX, e.touches[0].clientY, e.timeStamp)
            e = e.touches[0]
            x = e.pageX - img.offsetLeft;
            y = e.pageY - img.offsetTop;
            isclick = true;
            canmove = img.offsetHeight > fef.offsetHeight
        }
        repare_vars()
    }
    function f_tmove(e) {
        if (e.cancelable)
            e.preventDefault();
        if (istoch) {
            var dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
            // =====              make %             = pinch location effect ============================
            var o = (((dist - hypoth)) * 100 / witchof) * (factor / hypoth);

            var imdl = imd;

            imd = Math.max(o + imdt, minz)

            img.style.width = imd + "%";
            img.style.height = imd + "%";

            imt = (imt - y) / imdl * imd + y;
            iml = (iml - x) / imdl * imd + x;

            img.style.top = imt + "%";
            img.style.left = iml + "%";

        } else if (isclick) {
            DRM.move(e.touches[0].clientX, e.touches[0].clientY, e.timeStamp);
            e = e.touches[0]
            img.style.left = (e.pageX - x) + 'px';
            if (canmove)
                img.style.top = (e.pageY - y) + 'px';
        }
    }
    function repare_vars() {
        imd = img.offsetWidth * 100 / fef.offsetWidth
        imdt = imd
        imt = img.offsetTop * 100 / fef.offsetHeight
        iml = img.offsetLeft * 100 / fef.offsetWidth
    }
    function f_scroll(e) {
        if (is_ani_run >= new Date().getTime()) {
            // =========== stop ani
            DRM.start(0, 0, 0)
            setTimeout(function () {
                scroll(e)
            }, 30);
        } else {
            scroll(e)
        }
    }
    function scroll(e) {
        if (e.deltaMode == 1) {
            var dl = e.deltaY * 6;
        } else {
            var dl = e.deltaY / 30;
        }
        witchof = (fef.offsetWidth * (mimg.naturalWidth || mimg.videoWidth) / (mimg.naturalHeight || mimg.videoHeight) > fef.offsetHeight) ? fef.offsetHeight : fef.offsetWidth
        factor = (fef.offsetWidth * (mimg.naturalWidth || mimg.videoWidth) / (mimg.naturalHeight || mimg.videoHeight) > fef.offsetHeight) ? img.offsetHeight : img.offsetWidth

        dl = (dl * 100 / witchof) * (factor / witchof) * 15;


        e.preventDefault();
        img.style.transition = "none"

        var rect = fef.getBoundingClientRect();
        var elx = (e.pageX - rect.left) * 100 / fef.offsetWidth;
        var ely = (e.pageY - rect.top) * 100 / fef.offsetHeight;

        var imdl = imd;
        imd = Math.min(Math.max(imd - dl, 100), maxz)
        imt = ((imt - ely) / imdl * imd) + ely;
        iml = ((iml - elx) / imdl * imd) + elx;

        var bor = get_image_border()

        // ==============     make percent    == if not full sceen
        bor[0] = Math.min((bor[0] * imd / 100), (imd - 100) / 2)
        bor[1] = Math.min((bor[1] * imd / 100), (imd - 100) / 2)

        iml = Math.min(Math.max(iml, - (imd - 100 - bor[0])), -bor[0])
        imt = Math.min(Math.max(imt, - (imd - 100 - bor[1])), -bor[1])

        img.style.top = imt + "%";
        img.style.left = iml + "%";

        img.style.width = imd + "%";
        img.style.height = imd + "%";
    }
    function hide_tool(force) {
        if (hide_tool_time !== undefined)
            hide_tool_time = undefined
        if (force === undefined)
            force = fes.classList.contains("hidec")
        if (screen)
            screen(force ? 1 : 0)
        is_visible_tool = force
        if (force)
            fes.classList.remove("hidec");
        else
            fes.classList.add("hidec");
    }
    function full_toggle(force) {
        if (typeof force != "boolean")
            force = fes.classList.contains("full")
        if (!screen || screen && screen(force ? 2 : 0, mimg.videoHeight < mimg.videoWidth) !== false) {
            if (force)
                document.exitFullscreen()
            else
                fes.requestFullscreen();
        }
        if (force)
            fes.classList.remove("full");
        else
            fes.classList.add("full");
    }
}();