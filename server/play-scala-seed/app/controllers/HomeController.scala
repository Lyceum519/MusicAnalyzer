package controllers

import javax.inject._

import play.api.libs.ws.{WSClient, WSRequest, WSResponse}
import play.api.mvc._


import scala.concurrent.Future
import scala.concurrent.duration._
import utils.IDGenerator
/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(cc: ControllerComponents, ws: WSClient, idGenerator:IDGenerator ) extends AbstractController(cc) {
  val MY_URL = "http://localhost:9090/test";

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

  def upload() = Action { implicit request : Request[AnyContent] =>
    request.body.asMultipartFormData.map{ data =>
      import java.io.File

      val filename = data.file("picture" ).get.filename
      val contentType = data.file("picture").get.contentType;
      data.file("picture").get.ref.moveTo( new File( play.Environment.simple().rootPath() + "/tmp/picture/" + filename  ) );
      Redirect( routes.HomeController.result( idGenerator.generate( filename ) ) );


    }.getOrElse {
      Redirect( routes.HomeController.index() ).flashing(
        "error" -> "Missing file")
    }
  }

  def result( id:String ) = Action { implicit request : Request[AnyContent] =>
    Ok( views.html.result( idGenerator.generate( id ) ) );
  }

  def login() = Action { implicit request : Request[AnyContent] =>
    request.body.asJson.map{ jsonData =>
      Ok( views.html.index() );
    }.getOrElse {
      Ok( views.html.index() );
    }
  }

  def testClient() = Action { implicit  request : Request[AnyContent] =>

      val request: WSRequest = ws.url( MY_URL );

      val complexRequest: WSRequest = request
        .addQueryStringParameters("search" -> "play")
        .withRequestTimeout(10000.millis);

      val resp:Future[WSResponse] = complexRequest.get();

      Ok( views.html.result( idGenerator.generate( "test234" ) ) );
  }

}