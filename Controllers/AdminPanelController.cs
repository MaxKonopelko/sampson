using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.Mvc;
using MyEngine.Models;
using System.Data.Entity;
using ImageResizer;


namespace MyEngine.Controllers
{
    [Authorize(Roles = "admin, moderator")]
    public class AdminPanelController : Controller
    {
        UserContext db = new UserContext();

        public ActionResult IndexAdmin()
        {
            return View();
        }

        [HttpGet]
        public ActionResult ViewAllUsers()
        {
            //Сортировка пользователя в порядке даты его регистрации + связь с таблицей ролей
            var us = db.Users.OrderByDescending(u => u.CreationDate).Include(p=>p.Role);
            return View(us);
        }

        [HttpGet]
        public ActionResult DeleteUser(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }
            User user = db.Users.Find(id);
            if (user == null)
            {
              return  HttpNotFound();
            }
            return View(user);
        }

        [HttpPost, ActionName("DeleteUser")]
        public ActionResult DeleteConfirmed(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }
            User user = db.Users.Find(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            db.Users.Remove(user);
            db.SaveChanges();

            return RedirectToAction("ViewAllUsers");
        }

        [HttpGet]
        public ActionResult ViewUser(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }
            User user = db.Users.Find(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            
            user.Declarations = db.Declarations.Where(m => m.UserId == user.Id).Include(r=>r.User);
            
            return View(user);
        }

        public ActionResult DeleteDeclaration(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }
            Declaration declaration = db.Declarations.Find(id);
            if (declaration == null)
            {
                return HttpNotFound();
            }
            db.Declarations.Remove(declaration);
            db.SaveChanges();

            return RedirectToAction("ViewAllUsers");
        }
       
        public ActionResult ViewAllDeclarations()
        {
            var decl = db.Declarations.OrderByDescending(d => d.PublicDate).Include(u => u.User);
            return View(decl);
        }

              
        public ActionResult AddDeclaration()
        {
            var selectedIndex = db.Sections.FirstOrDefault().Id;
            SelectList sections = new SelectList(db.Sections, "Id", "Name", selectedIndex);
            ViewBag.Sections = sections;

            SelectList categories = new SelectList(db.Categories.Where(c => c.SectionId == selectedIndex), "Id", "Name");
            ViewBag.Categories = categories;

            return View();
        }

        public ActionResult GetItems(int id)
        {
            return PartialView(db.Categories.Where(c => c.SectionId == id).ToList());
        }

        [HttpPost]
        public ActionResult AddDeclaration(Declaration declaration, IEnumerable<HttpPostedFileBase> uploads)
        {
            var selectedIndex = db.Sections.FirstOrDefault().Id;
            SelectList sections = new SelectList(db.Sections, "Id", "Name", selectedIndex);
            ViewBag.Sections = sections;

            SelectList categories = new SelectList(db.Categories.Where(c => c.SectionId == selectedIndex), "Id", "Name");
            ViewBag.Categories = categories;

            if (ModelState.IsValid)
            {
                User user = db.Users.Where(e => e.Email == HttpContext.User.Identity.Name).FirstOrDefault();
                declaration.UserId = user.Id;

                declaration.PublicDate = DateTime.Now;

                db.Declarations.Add(declaration);
                db.SaveChanges();
               
                int i = 0; //счетчик для фотографий
                foreach (var file in uploads)
                {
                    if (file != null)
                    {   
                        DateTime current = DateTime.Now;
                        string ext = file.FileName.Substring(file.FileName.LastIndexOf('.'));
                        var path = Server.MapPath("~/Files/");
                        string pathDate = current.ToString("dd/MM/yyyy_H:mm:ss").Replace(":", "_")
                                .Replace("/", ".") + "-" + i;

                        for (int j = 0; j < 2; j++)
                        {
                            string pathDateNew = null;
                            switch (j)
                            {
                                case 0:
                                    pathDateNew = pathDate + "-" + j + ext;
                                    file.InputStream.Seek(0, System.IO.SeekOrigin.Begin);
                                    ImageBuilder.Current.Build(
                                        new ImageJob(
                                            file.InputStream,
                                            path + pathDateNew,
                                            new Instructions("maxwidth=750&maxheight=1000"),
                                            false,
                                            false));
                                    Image image = new Image {
                                        ImagePath = pathDateNew, 
                                        DeclarationId = declaration.Id,
                                        ImageOrder = j,
                                        ImageType = i
                                    };
                                    db.Images.Add(image);
                                    db.SaveChanges();
                                    break;
                                case 1:
                                    pathDateNew = pathDate + "-" + j + ext;
                                    file.InputStream.Seek(0, System.IO.SeekOrigin.Begin);
                                    ImageBuilder.Current.Build(
                                        new ImageJob(
                                            file.InputStream,
                                            path + pathDateNew,
                                            new Instructions("maxwidth=225&maxheight=300"),
                                            false,
                                            false));
                                    Image image1 = new Image {
                                        ImagePath = pathDateNew, 
                                        DeclarationId = declaration.Id,
                                        ImageOrder = j,
                                        ImageType = i
                                    };
                                    db.Images.Add(image1);
                                    db.SaveChanges();
                                    break;
                            }
                        }
                        i++;
                    }
                }
                return RedirectToAction("AddDeclaration", "AdminPanel");
            }
            return View();
        }
    }
}

