importScript('./tcs/js/StringUtil.js');


  var parseXml;

  if (typeof window.DOMParser != "undefined") {
      parseXml = function(xmlStr) {
          return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
      };
  } else if (typeof window.ActiveXObject != "undefined" &&
         new window.ActiveXObject("Microsoft.XMLDOM")) {
      parseXml = function(xmlStr) {
          var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async = "false";
          xmlDoc.loadXML(xmlStr);
          return xmlDoc;
      };
  } else {
      throw new Error("No XML parser found");
  }
  console.log("parseXml : "+parseXml);

  function $$(id){ return document.getElementById(id); }
  function getType(obj) {
      // Object.toString returns something like "[object Type]"
      var objectName = Object.prototype.toString.call(obj);
      // Match the "Type" part in the first capture group
      var match = /\[object (\w+)\]/.exec(objectName);

      return match[1].toLowerCase();
  }
  function clearlog(){
    var txtarea = tcsapp.panelDebug.debugTxtArea;
    if(txtarea){
      tcsapp.panelDebug.debugTxtArea.innerHTML = "";
    }

  }
  function log(msg){
    console.log(msg);
    var txtarea = tcsapp.panelDebug.debugTxtArea;
    if(txtarea){
      txtarea.innerHTML+="\n"+msg;
      txtarea.scrollTop  =txtarea.scrollHeight;
    }

  }

  function toggleOnOff(id){
    var dobj = $$(id);
    if(dobj){
      if(dobj.style.display == "block"){
        dobj.style.display = "none";
      }else{
        dobj.style.display = "block";
      }
    }

  }

  var enableBtnClick = 0;
  function eableHiddenButtons(target){
      enableBtnClick++;
      setTimeout(function(){enableBtnClick--;if(enableBtnClick<0)enableBtnClick=0},1000);
      if(enableBtnClick == 3){
        var btns = document.querySelectorAll(".hidden-button");
        for(var i = 0;i<btns.length;i++){
          if(btns[i] != target){
            var cn = btns[i].className;
            if(cn.indexOf("dashed-border")>-1){
              btns[i].classList.remove("dashed-border");
              btns[i].classList.remove("enable");
              btns[i].classList.add("disable");
            }else{
              btns[i].classList.add("dashed-border");
              btns[i].classList.add("enable");
              btns[i].classList.remove("disable");
            }
      }
      enableBtnClick = 0;
    }
  }
}

  function openFullPopup(id){
    var dobj = $$(id);
  		if(dobj)dobj.style.display = "block";
  		//ispopup = true;
  	}
  function closeFullPopup(id){
    var dobj = $$(id);
  		if(dobj)dobj.style.display = "none";
  		//ispopup = false;
  	}


  function importScript(url){
    var imported = document.createElement('script');
    imported.src = url;
    document.head.appendChild(imported);
  }
