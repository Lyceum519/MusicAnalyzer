package controllers

import javax.inject._

import akka.actor.ActorSystem
import play.api.libs.concurrent.CustomExecutionContext
import play.api.libs.ws.{WSClient, WSRequest, WSResponse}
import play.api.mvc._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.{ExecutionContext, Future}
import scala.concurrent.duration._
import utils.IDGenerator

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */

@Singleton
class HomeController @Inject()( cc: ControllerComponents, ws: WSClient, idGenerator:IDGenerator ) extends AbstractController(cc) {
  final val MY_URL = "http://localhost:9090";
  final val MP3_DIRECTORY = play.Environment.simple().rootPath().getAbsolutePath() + "/tmp/mp3/"

  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def upload( ) = Action { implicit request : Request[AnyContent] =>
    request.body.asMultipartFormData.map{ data =>
      import java.io.File

      val filename = data.file("picture" ).get.filename
      val contentType = data.file("picture").get.contentType;

      data.file("picture").get.ref.moveTo( new File(  MP3_DIRECTORY + filename  ) );

      Redirect( routes.HomeController.result( filename ) );
    }.getOrElse {

      Redirect( routes.HomeController.index() ).flashing(
        "error" -> "Missing file");
    }
  }


  def result( id:String ) = Action.async { implicit request : Request[AnyContent] =>


    val request: WSRequest = ws.url( MY_URL );
    val complexRequest: WSRequest = request
      .withHttpHeaders( "Content-Type" -> "application/json" )
      .addQueryStringParameters( "path" -> MP3_DIRECTORY )
      .addQueryStringParameters( "filename" -> id )
      .withRequestTimeout(1000000.millis);

    complexRequest.get().map( resp => {
      print( ( resp.json \ "results" ).as[List[Double]].toString() );
      Ok( views.html.result( idGenerator.generate( id ), ( resp.json \ "results" ).as[List[Double]] ) );
    });
  }

  def login() = Action { implicit request : Request[AnyContent] =>
    request.body.asJson.map{ jsonData =>
      Ok( views.html.index() );
    }.getOrElse {
      Ok( views.html.index() );
    }
  }



  def requestFile( fileName : String ) = {


  }

}