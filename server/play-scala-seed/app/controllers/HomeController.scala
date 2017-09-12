package controllers

import javax.inject._
import javax.swing.JLayeredPane

import play.api._
import play.api.mvc._
import play.mvc.Security.Authenticated
import views.html.defaultpages.badRequest
import play.api.Play.current

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

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
      Ok( views.html.index() );
    }.getOrElse {
      Redirect( routes.HomeController.index() ).flashing(
        "error" -> "Missing file")
    }
  }

}
