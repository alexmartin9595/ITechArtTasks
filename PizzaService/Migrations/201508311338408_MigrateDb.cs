namespace PizzaService.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDb : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.OrderToCooks", "OrderId", "dbo.Orders");
            DropForeignKey("dbo.OrderToCooks", "ShiftId", "dbo.Shifts");
            DropIndex("dbo.OrderToCooks", new[] { "OrderId" });
            DropIndex("dbo.OrderToCooks", new[] { "ShiftId" });
            CreateTable(
                "dbo.Histories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PizzaId = c.Int(nullable: false),
                        ShiftId = c.Int(nullable: false),
                        IsCompleted = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Pizzas", t => t.PizzaId, cascadeDelete: true)
                .ForeignKey("dbo.Shifts", t => t.ShiftId, cascadeDelete: true)
                .Index(t => t.PizzaId)
                .Index(t => t.ShiftId);
            
            AddColumn("dbo.Orders", "IsComplited", c => c.Boolean(nullable: false));
            DropTable("dbo.OrderToCooks");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.OrderToCooks",
                c => new
                    {
                        ShiftId = c.Int(nullable: false),
                        OrderId = c.Int(nullable: false),
                        IsCompleted = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => new { t.ShiftId, t.OrderId });
            
            DropForeignKey("dbo.Histories", "ShiftId", "dbo.Shifts");
            DropForeignKey("dbo.Histories", "PizzaId", "dbo.Pizzas");
            DropIndex("dbo.Histories", new[] { "ShiftId" });
            DropIndex("dbo.Histories", new[] { "PizzaId" });
            DropColumn("dbo.Orders", "IsComplited");
            DropTable("dbo.Histories");
            CreateIndex("dbo.OrderToCooks", "ShiftId");
            CreateIndex("dbo.OrderToCooks", "OrderId");
            AddForeignKey("dbo.OrderToCooks", "ShiftId", "dbo.Shifts", "Id", cascadeDelete: true);
            AddForeignKey("dbo.OrderToCooks", "OrderId", "dbo.Orders", "Id", cascadeDelete: true);
        }
    }
}
