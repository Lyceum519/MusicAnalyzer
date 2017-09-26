package utils

import javax.inject._

/**
  * Created by malgogi on 2017. 9. 24..
  */

@Singleton
class IDGenerator {
  def generate( file_name:String ):String = {
    file_name + "123";
  };
}
