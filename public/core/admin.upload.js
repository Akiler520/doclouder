/**
 * upload controller
 * based on webuploader of Baidu
 *
 * Author: Akiler
 * Date: 2016-02-17
 */
(function($){
    $.fn.AkUploader = function(settings) {
        settings = $.extend({}, $.fn.AkUploader.sn.defaults, settings);

        return this.each(function() {
            var $wrap = $(this),

                // 图片容器
                $queue = $( '<ul class="filelist"></ul>' )
                    .appendTo( $wrap.find( settings.queueList ) ),

                // 状态栏，包括进度和控制按钮
                $statusBar = $wrap.find( settings.statusBar ),

                // 文件总体选择信息。
                $info = $statusBar.find( settings.info ),

                // 上传按钮
                $upload = $wrap.find( settings.uploadBtn ),

                // 没选择文件之前的内容。
                $placeHolder = $wrap.find( '.placeholder' ),

                $progress = $statusBar.find( settings.progress ).hide(),

                // 添加的文件数量
                fileCount = 0,

                // 添加的文件总大小
                fileSize = 0,

                // 优化retina, 在retina下这个值是2
                ratio = window.devicePixelRatio || 1,

                // 缩略图大小
                thumbnailWidth = 110 * ratio,
                thumbnailHeight = 110 * ratio,

                // 可能有pedding, ready, uploading, confirm, done.
                state = 'pedding',

                // 所有文件的进度信息，key为file id
                percentages = {},
                // 判断浏览器是否支持图片的base64
                isSupportBase64 = ( function() {
                    var data = new Image();
                    var support = true;
                    data.onload = data.onerror = function() {
                        if( this.width != 1 || this.height != 1 ) {
                            support = false;
                        }
                    };
                    data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                    return support;
                } )(),

                // 检测是否已经安装flash，检测flash的版本
                flashVersion = ( function() {
                    var version;

                    try {
                        version = navigator.plugins[ 'Shockwave Flash' ];
                        version = version.description;
                    } catch ( ex ) {
                        try {
                            version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                                .GetVariable('$version');
                        } catch ( ex2 ) {
                            version = '0.0';
                        }
                    }
                    version = version.match( /\d+/g );
                    return parseFloat( version[ 0 ] + '.' + version[ 1 ], 10 );
                } )(),

                supportTransition = (function(){
                    var s = document.createElement('p').style,
                        r = 'transition' in s ||
                            'WebkitTransition' in s ||
                            'MozTransition' in s ||
                            'msTransition' in s ||
                            'OTransition' in s;
                    s = null;
                    return r;
                })(),

                // WebUploader实例
                uploader;

            if ( !WebUploader.Uploader.support('flash') && WebUploader.browser.ie ) {

                // flash 安装了但是版本过低。
                if (flashVersion) {
                    (function(container) {
                        window['expressinstallcallback'] = function( state ) {
                            switch(state) {
                                case 'Download.Cancelled':
                                    alert('您取消了更新！')
                                    break;

                                case 'Download.Failed':
                                    alert('安装失败')
                                    break;

                                default:
                                    alert('安装已成功，请刷新！');
                                    break;
                            }
                            delete window['expressinstallcallback'];
                        };

                        var swf = settings.swf;
                        // insert flash object
                        var html = '<object type="application/' +
                            'x-shockwave-flash" data="' +  swf + '" ';

                        if (WebUploader.browser.ie) {
                            html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
                        }

                        html += 'width="100%" height="100%" style="outline:0">'  +
                            '<param name="movie" value="' + swf + '" />' +
                            '<param name="wmode" value="transparent" />' +
                            '<param name="allowscriptaccess" value="always" />' +
                            '</object>';

                        container.html(html);

                    })($wrap);

                    // 压根就没有安转。
                } else {
                    $wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0">' +
                        '<img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
                }

                return;
            } else if (!WebUploader.Uploader.support()) {
                alert( 'Web Uploader 不支持您的浏览器！');
                return;
            }

            // 实例化
            uploader = WebUploader.create(settings);

            // 拖拽时不接受 js, txt 文件。
            uploader.on( 'dndAccept', function( items ) {
                var denied = false,
                    len = items.length,
                    i = 0,
                // 修改js类型
                    unAllowed = 'text/plain;application/javascript ';

                for ( ; i < len; i++ ) {
                    // 如果在列表里面
                    if ( ~unAllowed.indexOf( items[ i ].type ) ) {
                        denied = true;
                        break;
                    }
                }

                return !denied;
            });

            /**
             * 当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次。
             * object {Object}
             * data {Object}默认的上传参数，可以扩展此对象来控制上传参数。
             * headers {Object}可以扩展此对象来控制上传头部。
             */
            uploader.on('uploadBeforeSend', function(object, data, header){
                data.info = "test info";
            });

            // 排序
            uploader.on('filesQueued', function() {
                uploader.sort(function( a, b ) {
                    if ( a.name < b.name )
                        return -1;
                    if ( a.name > b.name )
                        return 1;
                    return 0;
                });
            });

            // 添加“添加文件”的按钮，
            uploader.addButton({
                id: '#filePicker2',
                label: '继续添加'
            });

            uploader.on('ready', function() {
                window.uploader = uploader;
            });

            // 当有文件添加进来时执行，负责view的创建
            function addFile( file ) {
                var $li = $( '<li id="' + file.id + '">' +
                        '<span class="cancel"></span>' +
                        '<p class="title">' + file.name + '</p>' +
                        '<p class="progress"><span></span></p>' +
                        '</li>' ),

                    $prgress = $li.find('p.progress span'),
                    $cancel = $li.find("span.cancel");

                $cancel.on( 'click', function() {
                    uploader.removeFile( file );
                });

                if ( file.getStatus() === 'invalid' ) {
                    showError( file.statusText, file );
                } else {
                    percentages[ file.id ] = [ file.size, 0 ];
                }

                file.on('statuschange', function( cur, prev ) {
                    if ( prev === 'progress' ) {
                        $prgress.hide().width(0);
                    } else if ( prev === 'queued' ) {
                        $li.off( 'mouseenter mouseleave' );
                    }

                    // 成功
                    if ( cur === 'error' || cur === 'invalid' ) {
                        showError( file.statusText, file );
                        percentages[ file.id ][ 1 ] = 1;
                    } else if ( cur === 'interrupt' ) {
                        showError( 'interrupt', file );
                    } else if ( cur === 'queued' ) {
                        percentages[ file.id ][ 1 ] = 0;
                    } else if ( cur === 'progress' ) {
                        //$info.remove();
                        $prgress.css('display', 'block');
                    } else if ( cur === 'complete' ) {
                        $li.append( '<span class="success"></span>' );
                    }

                    $li.removeClass( 'state-' + prev ).addClass( 'state-' + cur );
                });

                $li.appendTo( $queue );
            }

            function showError ( code, file ) {
                var $li = $('#'+file.id);
                var $infoError = $li.find(".error");

                var $error = $('<p class="error"></p>');

                switch( code ) {
                    case 'exceed_size':
                        text = '文件大小超出';
                        break;

                    case 'interrupt':
                        text = '上传暂停';
                        break;

                    default:
                        text = code;
                        break;
                }

                $li.find(".success").remove();

                if($infoError.length <= 0){
                    $error.text( text ).appendTo($li);
                    $infoError = $li.find(".error");
                }else{
                    $infoError.text( text );
                }

                $infoError.show();
            }

            // 负责view的销毁
            function removeFile( file ) {
                var $li = $('#'+file.id);

                delete percentages[ file.id ];
                updateTotalProgress();

                $li.off().find('.file-panel').off();

                $li.fadeOut(500, function() {
                    $li.remove();
                });
            }

            function updateTotalProgress() {
                var loaded = 0,
                    total = 0,
                    spans = $progress.children(),
                    percent;

                $.each( percentages, function( k, v ) {
                    total += v[ 0 ];
                    loaded += v[ 0 ] * v[ 1 ];
                } );

                percent = total ? loaded / total : 0;

                spans.eq( 0 ).text( Math.round( percent * 100 ) + '%' );
                spans.eq( 1 ).css( 'width', Math.round( percent * 100 ) + '%' );

                updateStatus();
            }

            function updateStatus() {
                var text = '', stats;

                if ( state === 'ready' ) {
                    text = '选中' + fileCount + '个文件，共' +
                        WebUploader.formatSize( fileSize ) + '。';
                } else if ( state === 'confirm' ) {
                    stats = uploader.getStats();
                    if ( stats.uploadFailNum ) {
                        text = '成功上传' + stats.successNum+ '个，'+stats.uploadFailNum + '个上传失败，' +
                            '<a class="retry" href="#">重新上传</a>失败文件或<a class="ignore" href="#">忽略</a>'
                    }
                } else {
                    stats = uploader.getStats();
                    text = '共' + fileCount + '个文件（' +
                        WebUploader.formatSize( fileSize )  +
                        '），成功上传' + stats.successNum + '个';

                    if ( stats.uploadFailNum ) {
                        text += '，失败' + stats.uploadFailNum + '个';
                    }
                }

                $info.html( text );
            }

            /**
             * 文件状态值，具体包括以下几种类型：
                 inited 初始状态
                 queued 已经进入队列, 等待上传
                 progress 上传中
                 complete 上传完成。
                 error 上传出错，可重试
                 interrupt 上传中断，可续传。
                 invalid 文件不合格，不能重试上传。会自动从队列中移除。
                 cancelled 文件被移除。
             * @param val
             */
            function setState( val ) {
                var file, stats;

                if ( val === state ) {
                    return;
                }

                var $filePickerB = $( '#filePicker2' );

                $upload.removeClass( 'state-' + state );
                $upload.addClass( 'state-' + val );
                state = val;

                switch ( state ) {
                    case 'pedding': // queued
                        $placeHolder.removeClass( 'element-invisible' );
                        $queue.hide();
                        $statusBar.addClass( 'element-invisible' );
                        uploader.refresh();
                        break;

                    case 'ready':   // inited
                        $placeHolder.addClass( 'element-invisible' );
                        $filePickerB.removeClass( 'element-invisible');
                        $queue.show();
                        $statusBar.removeClass('element-invisible');
                        uploader.refresh();
                        break;

                    case 'uploading':   // progress
                        $filePickerB.addClass( 'element-invisible' );
                        $wrap.find(".error").hide();
                        $progress.show();
                        $upload.text( '暂停上传' );
                        break;

                    case 'interrupt':
                        break;

                    case 'error':
                        break;

                    case 'paused':
                        $progress.show();
                        $upload.text( '继续上传' );
                        break;

                    case 'confirm': // invalid
                        $progress.hide();
                        $filePickerB.removeClass( 'element-invisible' );
                        $upload.text( '开始上传' );

                        stats = uploader.getStats();
                        if ( stats.successNum && !stats.uploadFailNum ) {
                            setState( 'finish' );
                            return;
                        }
                        break;
                    case 'finish':  // complete
                        stats = uploader.getStats();
                        if ( stats.successNum ) {
                            //alert( '上传成功' );
                        } else {
                            // 没有成功的图片，重设
                            state = 'done';
                            location.reload();
                        }
                        break;
                }

                updateStatus();
            }

            /**
             * 从上传列表中移除服务器上存在的文件，不需要上传
             * 在shareExistFile处理成功后调用
             * @param bool inFolder
             */
            function removeExistFile(inFolder){
                setTimeout(function(){
                    var files = uploader.getFiles();    // 获取当前队列中的文件
                    var $filePanel;

                    for (var key_file in files){
                        if(!files.hasOwnProperty(key_file)){
                            continue;
                        }

                        $filePanel = $("#"+files[key_file].id);

                        if(inFolder){
                            // 文件存在于当前文件夹
                            ($filePanel.attr("folderId") > 0) && uploader.removeFile(files[key_file]);
                        }else{
                            ($filePanel.attr("folderId") == 0) && uploader.removeFile(files[key_file]);
                        }
                    }
                }, 3000);
            }

            /**
             * 如果文件已经存在于服务器，就只共享文件的链接地址，不需要再上传了；
             * @param existArr
             */
            function shareExistFile(existArr){
                var folderId = window.mainElement.currentFolder; // current selected folder;
                var postData = {list: existArr, folderId: folderId};

                // create a file link to the exist file on server;
                $.ProcessManager.run({
                    url     : '/Document/shareExist',
                    data    : postData,
                    beforeSend  : function(){ },
                    success     :function(ret){
                        if(ret.status_code != RESPONSE_SUCCESS){
                            AdminMessager.show(ret.status_code, ret.status_message);
                        }else{
                            removeExistFile();
                        }
                    }
                });
            }

            /**
             * 上传过程中触发，携带上传进度。
             * @param file File对象
             * @param percentage
             */
            uploader.onUploadProgress = function( file, percentage ) {
                var $li = $('#'+file.id),
                    $percent = $li.find('.progress span');

                $percent.css( 'width', percentage * 100 + '%' );
                percentages[ file.id ][ 1 ] = percentage;
                updateTotalProgress();
            };

            /**
             * 当文件被加入队列以后触发。
             * @param file File对象
             */
            uploader.onFileQueued = function( file ) {
                fileCount++;
                fileSize += file.size;

                if ( fileCount === 1 ) {
                    $placeHolder.addClass( 'element-invisible' );
                    $statusBar.show();
                }

                // 生成md5串，完成后需要传递到服务器，检测文档是否已经存在；返回的是 promise 对象
                this.md5File(file, 0, 2 * 1024 * 1024)
                    .progress(function(percentage) {
                        // 可以用来监听进度
                        // console.log('Percentage:', percentage);
                    })
                    .then(function(md5) {
                        var folderId = window.mainElement.currentFolder; // current selected folder;

                        // 检查服务器是否存在该文件
                        $.ProcessManager.run({
                            url         : "/Document/md5Check",
                            data        : "md5=" + md5 + "&folderId="+folderId,
                            beforeSend  : function(){},
                            success     : function(data) {
                                if(data.status_code == RESPONSE_FILE_EXIST){
                                    var $li = $('#'+file.id);
                                    $li.css({border: 'solid 1px green'}).attr("fileId", data.data.id).attr("folderId", data.data.folderId);
                                }
                            }
                        });
                    });

                addFile( file );
                setState( 'ready' );
                updateTotalProgress();
            };

            /**
             * 当一批文件添加进队列以后触发。
             * @param files 数组，内容为原始File(lib/File）对象。
             */
            uploader.onFilesQueued = function( files ) {
                //console.log(files);
               /* var start =  +new Date();

                for(var i = 0; i < files.length; i++){
                    var file = files[i];

                    this.md5File(file, 0, 2 * 1024 * 1024)
                        .progress(function(percentage) {
                            // 可以用来监听进度
                            //console.log('Percentage:', percentage);

                        })
                        .then(function(md5) {
                            // 处理完成后触发
                            var end = +new Date();
                            console.log('[HTML5]: md5 ' + file.name + ' cost ' + (end) + 'ms, [md5]: ' + md5);

                            // 检查服务器是否存在该文件
                            $.ProcessManager.run({
                                url     : "/Document/md5Check",
                                data    : "md5=" + md5,
                                success : function(data) {
                                    if(data.status_code == RESPONSE_ERROR){
                                        AdminMessager.show(data.status_code, data.status_message);
                                    }else{
                                        // TODO: start to upload
                                    }
                                }
                            });
                        });
                }*/
            };

            uploader.onUploadSuccess = function(file, response){
                if(response.status_code != RESPONSE_SUCCESS){
                    uploader.trigger("error", response.status_message, file);
                }

                setTimeout(function(){
                    uploader.removeFile(file);
                }, 3000);
            };

            uploader.onUploadError = function(file, reason ){
                uploader.trigger("error", reason, file);
            };

            /**
             * 当文件被移除队列后触发。
             * @param file
             */
            uploader.onFileDequeued = function( file ) {
                fileCount--;
                fileSize -= file.size;

                if ( !fileCount ) {
                    setState( 'pedding' );
                }

                removeFile( file );
                updateTotalProgress();
            };

            uploader.onStopUpload = function() {
                WebUploader.log("Try to stop upload...");
            };

            uploader.on( 'all', function( type ) {
                switch( type ) {
                    case 'uploadFinished':
                        setState( 'confirm' );
                        break;

                    case 'startUpload':
                        setState( 'uploading' );
                        break;

                    case 'stopUpload':
                        setState( 'paused' );
                        break;
                }
            });

            uploader.onError = function( code, file ) {
                switch (code){
                    case 'F_DUPLICATE':
                        showError("The file is existing in the list;", file);
                        break;
                    case 'F_EXCEED_SIZE':
                        showError("The size of file exceed;", file);
                        break;
                    case 'Q_EXCEED_NUM_LIMIT':
                        showError("The number of files exceed the Max setting.", file);
                        break;
                    case 'Q_EXCEED_SIZE_LIMIT':
                        showError("The size of files exceed the Max setting.", file);
                        break;
                    case 'Q_TYPE_DENIED':
                        showError("The type of file is invalid;", file);
                        break;
                    default:
                        showError("[" + code + "]", file);
                        break;
                }
            };

            $upload.on('click', function() {
                if ( $(this).hasClass( 'disabled' ) ) {
                    return false;
                }

                // state可能有 pedding, ready, uploading, confirm, done.

                switch (state){
                    case "ready":
                        // remove the exist file before upload;
                        var files = uploader.getFiles();
                        var existCount = 0;
                        var existArr = [];

                        // checkout the exist files on server
                        for(var i=0; i < files.length; i++){
                            var fileId = $("#" + files[i].id).attr("fileId");
                            var folderIdTmp = $("#" + files[i].id).attr("folderId");

                            if(parseInt(fileId) > 0){
                                // must create a file link to the exist file on server;
                                var existData = {existId: fileId, id: files[i].id};

                                (folderIdTmp <= 0) && existArr.push(existData) && existCount++;

                                uploader.skipFile(files[i]);
                            }
                        }

                        if(existCount > 0){
                            shareExistFile(existArr);
                        }

                        removeExistFile(true);
                        uploader.upload();

                        break;
                    case "paused":
                        setState("uploading");
                        uploader.upload();
                        break;
                    case "uploading":
                        setState("paused");
                        uploader.stop(true);
                        break;
                    case "confirm":
                        break;
                    case "done":
                        break;
                    default:
                        break;
                }
            });

            $info.on( 'click', '.retry', function() {
                uploader.retry();
            } );

            $info.on( 'click', '.ignore', function() {
                alert( 'todo' );
            } );

            $upload.addClass( 'state-' + state );
            updateTotalProgress();
        });
    };

    $.fn.AkUploader.sn = {
        defaults: {
            server          : '',
            queueList       : '.queueList',
            statusBar       : '.statusBar',
            info            : '.info',
            uploadBtn       : '.uploadBtn',
            progress        : '.progress',
            formData        : '',
            dnd             : '',
            paste           : '',
            swf             : '',
            chunked         : false,
            chunkSize       : 2 * 1024 * 1024, // 2 M, 建议chunk使用，速度最快

            fileNumLimit    : 20,
            fileSizeLimit   : 200 * 1024 * 1024,    // 200 M
            fileSingleSizeLimit: 50 * 1024 * 1024,    // 50 M

            // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
            disableGlobalDnd: true

            // runtimeOrder: 'flash',

            // accept: {
            //     title: 'Images',
            //     extensions: 'gif,jpg,jpeg,bmp,png',
            //     mimeTypes: 'image/*'
            // },
        }
    };
})(jQuery);