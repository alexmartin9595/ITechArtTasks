namespace PizzaService.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Migrate : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Pizzas", "Order_Id", "dbo.Orders");
            DropIndex("dbo.Pizzas", new[] { "Order_Id" });
            CreateTable(
                "dbo.PizzaToOrders",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PizzaId = c.Int(nullable: false),
                        OrderId = c.Int(nullable: false),
                        Count = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Orders", t => t.OrderId, cascadeDelete: true)
                .ForeignKey("dbo.Pizzas", t => t.PizzaId, cascadeDelete: true)
                .Index(t => t.OrderId)
                .Index(t => t.PizzaId);
            
            DropColumn("dbo.Pizzas", "Order_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Pizzas", "Order_Id", c => c.Int());
            DropForeignKey("dbo.PizzaToOrders", "PizzaId", "dbo.Pizzas");
            DropForeignKey("dbo.PizzaToOrders", "OrderId", "dbo.Orders");
            DropIndex("dbo.PizzaToOrders", new[] { "PizzaId" });
            DropIndex("dbo.PizzaToOrders", new[] { "OrderId" });
            DropTable("dbo.PizzaToOrders");
            CreateIndex("dbo.Pizzas", "Order_Id");
            AddForeignKey("dbo.Pizzas", "Order_Id", "dbo.Orders", "Id");
        }
    }
}
