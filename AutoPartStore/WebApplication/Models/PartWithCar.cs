namespace WebApplication.Models
{
    public class PartWithCar
    {
        public PartModel Part { get; set; }
        public CarModel Car { get; set; }

        public PartWithCar()
        {

        }

        public PartWithCar(PartModel part, CarModel car)
        {
            Part = part;
            Car = car;
        }
    }
}
