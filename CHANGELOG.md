# Change Log

All notable changes to the "getter-setter-generator" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.0.0]

- Initial release

## [1.4.1]

- fixed some bugs

- Now, this extension will use *Decorator* to encapsulation `python` fields. 

  Just like this:

  ```python
  class r():
      __name = ""
      
          @property
      def name(self):
          return self.__name
      
      @name.setter
      def name(self, name):
          self.__name = name
  ```

- It can discriminate indent now.

- It can encapsulation many python fields at one time now.

  GIF here:

  ​	https://www.bilibili.com/read/cv17930525