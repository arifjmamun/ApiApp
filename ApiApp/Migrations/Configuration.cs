using ApiApp.Models;

namespace ApiApp.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ApiApp.Models.ApiDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ApiApp.Models.ApiDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            context.Products.AddOrUpdate(
                new Product { ProductName = "Shirt", Price = 450, Description = "Easy Formal Shirt"},
                new Product { ProductName = "Pants", Price = 650, Description = "Jeans"},
                new Product { ProductName = "Boxer", Price = 550, Description = "Calvin Klein 3 Piece"}
            );
        }
    }
}
