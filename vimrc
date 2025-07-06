" clipboard limit
set viminfo='1000,<500
set clipboard=unnamedplus

" line num
set nu

" theme
filetype plugin indent on
set tabstop=4
set shiftwidth=4
set softtabstop=4
set expandtab

" When open Chinese with garbled. via <https://www.zhihu.com/question/22363620>
" <https://stackoverflow.com/questions/8121609/vims-encoding-options>
" Don't set up the encoding of vim!!!(set encode=utf8)
" Don't touch the lacale command !!! T_T(Will make your bash broken...)
set fileencodings=utf-8,gb2312,gb18030,gbk,ucs-bom,cp936,latin1
set enc=utf8
set fencs=utf8,gbk,gb2312,gb18030
