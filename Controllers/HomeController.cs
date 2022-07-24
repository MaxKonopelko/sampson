using System.Collections.Generic;
using System.Linq;
using MyEngine.Models;
using System.Web.Mvc;
using System.Data.Entity;

namespace MyEngine.Controllers
{
    [AllowAnonymous]
    public class HomeController : Controller
    {
        UserContext db = new UserContext();

        public ActionResult Index()
        {
            if (this.Request.IsAjaxRequest())
                return PartialView();
            return View();
        }

        public ActionResult ViewDeclaration(int id)
        {
            ViewBag.Img = db.Images.Where(i => i.ImageOrder == 1);    

            IEnumerable<Declaration> dec = db.Declarations.OrderByDescending(d => d.PublicDate)
               .Include(c => c.Category.Section).Where(r => r.Category.Section.Id == id);

            if (this.Request.IsAjaxRequest())
                return PartialView(dec);
            return View(dec);
        }

        public ActionResult ViewDeclarationCategory(int id)
        {
            ViewBag.Img = db.Images.Where(i => i.ImageOrder == 1);  

            IEnumerable<Declaration> dec = db.Declarations.OrderByDescending(d => d.PublicDate)
               .Include(c => c.Category.Section).Where(r => r.CategoryId == id);

            if (this.Request.IsAjaxRequest())
                return PartialView("ViewDeclaration", dec);
            return View("ViewDeclaration", dec);
        }

        public ActionResult ViewCurrentDeclaration(int id)
        {
            Declaration dec = db.Declarations.Find(id);
            if (dec.Coast != null)
            {
                if (dec.Coast == 0)
                    ViewBag.Coast = null;
                else
                {
                    MyСonverter myConverter = new MyСonverter();
                    string coast = myConverter.ValueSpaceConvert((int)dec.Coast);
                    ViewBag.Coast = coast + " р.";
                }
            }

            IEnumerable<Image> img = db.Images;
            ViewBag.img = img.Where(i => i.DeclarationId == dec.Id).Where(i => i.ImageOrder == 0);

            if (this.Request.IsAjaxRequest())
                return PartialView(dec);
            return View(dec);
        }

        public ActionResult Catalog(int id = 0)
        {
            IEnumerable<Category> cat = db.Categories.OrderBy(d => d.Id)
                .Where(r => r.SectionId == id);

            if (this.Request.IsAjaxRequest())
                return PartialView(cat);
            return View(cat);
        }
    }
}
