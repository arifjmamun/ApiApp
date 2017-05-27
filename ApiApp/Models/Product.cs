using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ApiApp.Models
{
    public class Product
    {
        public int ProductId { get; set; }

        [Display(Name = "Product")]
        [Required]
        [Column(TypeName = "varchar")]
        [StringLength(100)]
        public string  ProductName { get; set; }
        
        public double Price { get; set; }

        [Column(TypeName = "varchar")]
        [StringLength(255)]
        public string Description { get; set; }
    }
}