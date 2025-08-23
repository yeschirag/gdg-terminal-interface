const asciiFrames = [
    `                                    .L0;   .::.   ;0L,                                         
                                        ,GG:   :GfLG:   :GG,                                        
                                       :0C,   ;0L,,C0;   ,GG:                                       
                                      ;0L,   i0f....f0i   .C0;                                      
                                     i8f.   18t. .. .t01   .f8i                                     
                                    18t.  .t81.  ..  .18t.  .t81                                    
                                  .f81.  .f0i    ..    i8f.  .18f.                                  
                                 .L8i.  .C0;     ..     ;0C.   i8L.                                 
                                .C0;   ,GG:     ,.,,     :0G,   ;8C.                                
                               ,G0:   :0C,      t,:t      ,G0:   :0G,                               
                              :0G,   ;0L,      tt..tt      .C0;   ,G0:                              
                             ;8C,   i8f.     .f1,:::1f.     .f8i   .C8;                             
                            i8f.   18t.     .Li f11f iL.     .t81   .L8i                            
                           18t.  .f81.     ,L; tL::Lt ;L,      18f.  .t81                           
                         .t81.  .L8i      :L, tft::tft ,L:      i8L.  .18f.                         
                        .L8i.  .C0;      ;L..ff111111ff..L;      :0C.   i8L.                        
                       .C0;   ,GG:      iL.,ffiifttLiiff,.Li      :GG,   ;8C.                       
                      ,G0:   :0C,      1f :Lf:;LL11LL;:fL: f1      ,C0:   :0G,                      
                     :0G:   ;8L.      tt ;Lt,;ff1::1LL;,tL; tt      .L8;   ,G0:                     
                    ;0C,   i8f.      f1 iLt,;Lf1::;:1LL;,tLi 1f.     .f81   ,C8;                    
                   i8f.   t81.     .fi 1L1,iLfi:;;;;:ifLi,1L1 iL.     .t8t   .L8i                   
                  18t.  .f8i      ,L; tLi.1Lfi:;;;;;;;ifL1,1Lt ;L,      i8f.  .f81                  
                 t81.  .L8;      :L, tfi,tLfi;;;;;;;;;;ifLt,iff :L:      ;8C.  .18f                 
               .f8i   .C0:      ;L..ff;,tLt;;;;;;;;;;;;;;tLf,;ff..L;      ;0G,  .i8L.               
              .C0;   ,GG,      if.,ff::tfi;;;;;;;;;;;;;;;;ift:;fL,.Li      :G0,  .;0C.              
             ,GG:   :0C,      1f :ft::1:i;;;;;;;;;;;;;;;;;;i:1::tL: f1      ,C0:   ;GG,             
            :0G,   ;8f.      tt ;Lt:;t,::;:;::::::;;;;;;;;;::,t;:tL; tt      .L8i   :G0:            
           :0L,   18t.      f1 1f1;:iiiiiiiiiiiiiiiiiiiiiiiiiiii:;1f1 1f      .t81   ,C0;           
          i8f.   t81      .fi 1t   ,............................,  .t1 if.     .18t   ,f0i          
         18t.  .f8i      ,L; iL:::::::::::::::::::::::::::::::::::::;Li ;L,      i0f.  .t01         
        t81.  .L0;      ,f:.,,:;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:,,.:f,      ;0L.  .10t        
      .f0i   ,CG:      .,,.i1iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii..:..     :GC,  .i0f.      
     .L0;   :GC,    ....                                                    .....   :CG:  .;GL.     
    ,CG:   ;0L.  .....                                                        .....  ,LG;  .;CC,    
   :GC,   i0f. ....                                                              .....,f0i   :LC:   
  :GL,   101.....                                                                  ....,tG1   :fG;  
 ;0f.  .tGi ..                                                                        ...iCt.  ,tG; 
10t. ...fCfLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLCCCLCCLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLCt,.. ,tG1
Gi.......;;;;;;;;;;;;;;;;;i;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;......,iG
,  ..,..                                                                                   ...,.   ,
.,ifLLLCCCCCCCCCCCCCCCCCCCCCCCCCCGGGGGGGGGGGGGGGGGGGGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCLLLLf;,.
..::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::,:,,,,,,,,::,,::..
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                            ....... `
];

function playAscii(elementId, interval = 60, colour = "#00ff00") {
  let i = 0;
  async function loop() {
    const frames = asciiFrames.length;
    while (true) {
      const element = document.getElementById(elementId);
      if (element) {
          element.innerHTML = `<font color="${colour}"><pre>${asciiFrames[i]}</pre></font>`;
      }
      await new Promise(r => setTimeout(r, interval));
      i = (i + 1) % frames;
    }
  }
  loop();
}

export { asciiFrames, playAscii };
