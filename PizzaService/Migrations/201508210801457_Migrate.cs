namespace PizzaService.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Migrate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Pizzas", "Name", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Pizzas", "Name");
        }
    }
}
