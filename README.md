# Whisky Palette CLI

**개발 환경: Mac OS**

### **1. Homebrew 설치**

### **2. Node 설치**

**npm을 사용한다.**

**아래의 버젼으로 작업했다.**

    node v20.5.0
    npm | npx v9.8.0

### **3. Ruby 설치**

    brew install rbenv
    rbenv install 2.7.4
    rbenv global 2.7.4
    rbenv rehash

**_필요시(로컬)_**

    rbenv local 2.7.4

**rbenv, bundler 설치**

    gem install bundler
    sudo gem install cocoapods

**Ruby 환경 설정**

    export PATH="$HOME/.rbenv/bin:$PATH"
    eval "$(rbenv init -)"

### **3. Watchman 설치**

    brew install watchman

### **4. Java Development Kit 설치**

    brew tap homebrew/cask-versions
    brew install --cask zulu11

**JAVA 환경 설정**

    export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home
    export PATH="$JAVA_HOME/bin:$PATH"

### **5. Android Studio 설치**

-   Android SDK Platform 31(Tramisu)
-   SDK 33
-   Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

**Android SDK 환경 설정**

    export ANDROID_HOME="/Users/yuntaemin/Library/Android/sdk"
    export PATH="$ANDROID_HOME/emulator:$PATH"
    export PATH="$ANDROID_HOME/platform-tools:$PATH"

## **Appendix**

### **Font가 설정 안 될 때**

    npx react-native-asset
