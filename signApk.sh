jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /home/shadab/Projects/ionic/Ksrp-Store/Ksrp-Store-key.keystore app-debug.apk Ksrp-Store-key

zipalign -v 4 signed_ap-debug.apk Ksrp-Store.apk