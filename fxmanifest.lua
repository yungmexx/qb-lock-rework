fx_version 'cerulean'
games { 'gta5' }

author 'SpMex'
description 'Lockpick Circle Mini-Game'
version '1.0'

client_scripts {
    'client/*.lua',
}

ui_page {
    'html/index.html',
}

files {
    'html/index.html',
    'html/*.css',
    'html/*.js',
}

ui_page 'html/index.html'

exports {
    "StartLockPickCircle"
}
