namespace PizzaService.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class asasasas : DbMigration
    {
        public override void Up()
        {
            //DropPrimaryKey("dbo.PizzaIngredients");
            AddPrimaryKey("dbo.PizzaIngredients", new[] { "IngredientId", "PizzaId" });
            DropPrimaryKey("dbo.PizzaToOrders");
            AddPrimaryKey("dbo.PizzaToOrders", new[] { "PizzaId", "OrderId" });
            DropColumn("dbo.PizzaIngredients", "Id");
            DropColumn("dbo.PizzaToOrders", "Id");
        }
        
        public override void Down()
        {
            //AddColumn("dbo.PizzaToOrders", "Id", c => c.Int(nullable: false, identity: true));
            AddColumn("dbo.PizzaIngredients", "Id", c => c.Int(nullable: false, identity: true));
            DropPrimaryKey("dbo.PizzaToOrders");
            AddPrimaryKey("dbo.PizzaToOrders", "Id");
            DropPrimaryKey("dbo.PizzaIngredients");
            AddPrimaryKey("dbo.PizzaIngredients", "Id");
        }
    }
}
