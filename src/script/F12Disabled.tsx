import Script from 'next/script';
import { ReactElement } from 'react';

export default function F12Disabled(): ReactElement {
  return (
    <Script id="nextjs-google-analytics" strategy="afterInteractive">
      {`
                    function _0x59f2(_0x71ca3,_0x35b064){var _0x223181=_0x2231();return _0x59f2=function(_0x59f249,_0x50a7de){_0x59f249=_0x59f249-0x165;var _0x315955=_0x223181[_0x59f249];return _0x315955;},_0x59f2(_0x71ca3,_0x35b064);}(function(_0x56154b,_0xd457b8){var _0x4b5ac0=_0x59f2,_0x10c508=_0x56154b();while(!![]){try{var _0x1dff8c=parseInt(_0x4b5ac0(0x165))/0x1*(-parseInt(_0x4b5ac0(0x16e))/0x2)+-parseInt(_0x4b5ac0(0x173))/0x3*(-parseInt(_0x4b5ac0(0x16b))/0x4)+-parseInt(_0x4b5ac0(0x16f))/0x5+parseInt(_0x4b5ac0(0x17a))/0x6+parseInt(_0x4b5ac0(0x178))/0x7*(parseInt(_0x4b5ac0(0x17e))/0x8)+-parseInt(_0x4b5ac0(0x16c))/0x9+parseInt(_0x4b5ac0(0x177))/0xa*(parseInt(_0x4b5ac0(0x16a))/0xb);if(_0x1dff8c===_0xd457b8)break;else _0x10c508['push'](_0x10c508['shift']());}catch(_0x22a49f){_0x10c508['push'](_0x10c508['shift']());}}}(_0x2231,0xb4a8e),!(function(){var _0x390227=_0x59f2;function _0x22e088(){var _0x561b22=_0x59f2;document[_0x561b22(0x172)]['href']=_0x561b22(0x171);}window[_0x390227(0x16d)]?document['readyState']===_0x390227(0x17b)||document[_0x390227(0x169)]===_0x390227(0x167)?(_0x22e088(),window[_0x390227(0x16d)](_0x390227(0x175),_0x22e088),window[_0x390227(0x16d)](_0x390227(0x174),_0x22e088),window[_0x390227(0x16d)](_0x390227(0x168),_0x22e088),window[_0x390227(0x16d)](_0x390227(0x170),_0x22e088)):setTimeout(argument[_0x390227(0x179)],0x0):(window['addEventListener'](_0x390227(0x17d),_0x22e088),window[_0x390227(0x17c)](_0x390227(0x176),_0x22e088),window['addEventListener'](_0x390227(0x166),_0x22e088),window['addEventListener'](_0x390227(0x17f),_0x22e088),window['addEventListener']('blur',_0x22e088));}()));function _0x2231(){var _0x5a5cbc=['6779GZbAHV','mousemove','interactive','onfocus','readyState','9977ODYJVI','119920KXlkds','4104063ZUbzav','attachEvent','362kDwxhv','5805225IEtErQ','onblur','http://localhost:3000/','location','78UabPBv','onmousemove','onresize','resize','18420BwphtK','7ByLGKS','callee','4335918LBcKau','complete','addEventListener','load','3289648djmzWx','focus'];_0x2231=function(){return _0x5a5cbc;};return _0x2231();}
                `}
    </Script>
  );
}
