namespace WebApplication.Models
{
    using System;

    public class PartModel
    {
        public Guid PartGuid { get; set; }
        public Guid FK_CarGuid { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string ImgUrl { get; set; }

        public PartModel()
        {
            PartGuid = Guid.NewGuid();
        }

        public PartModel(string fk_carGuid, string name, decimal price, string category, string description, string imgUrl)
        {
            PartGuid = Guid.NewGuid();
            FK_CarGuid = new Guid(fk_carGuid);
            Name = name;
            Price = price;
            Category = category;
            Description = description;
            ImgUrl = imgUrl;
        }

        public override string ToString()
        {
            return $"Part Name:{Name}, Part Price: {Price}";
        }
    }
}