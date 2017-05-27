var app = {
    Product: null,
    Init: function() {
        app.AppendTableData(this.GetAll);
    },

    AppendTableData: function(fn) {
        fn();
    },

    GetAll: function() {
        $.get("/api/Products", function(data) {
            $.each(data, function(index, row) {
                $("<tr>").html(
                    '<td>'+row.ProductName+'</td>'+
                    '<td>'+row.Price+'</td>'+
                    '<td>'+row.Description+'</td>'+
                    '<td>' +
                        '<a href="'+'/Product/Details/'+row.ProductId+'" class="btn btn-xs btn-info details">Details</a> '+
                        '<a href="'+'/Product/Edit/'+row.ProductId+'" class="btn btn-xs btn-default edit">Edit</a> '+
                        '<a href="'+'/api/Products/'+row.ProductId+'" class="btn btn-xs btn-danger delete">Delete</a>'+
                    '</td>'
                ).attr('data-productId',row.ProductId).appendTo($("tbody"));
            });
        });
    },
    
    CreateNew: function() {
        $.post("/api/Products", $("form").serialize(), function (response) {
            if (response !== {}) {
                app.ClearFields();
                app.SetAlert(true);
            } else  app.SetAlert(false);
        });

        //used for ajax submit
        return false;
    },

    ClearFields: function () {
        document.getElementById("createForm").reset();
    },

    SetAlert: function(status) {
        if (status) {
            $(".alert-msg").empty().html(
                '<div class="alert alert-success alert-dismissable">'+
                    '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
                  '<strong>Success!</strong> New Product Added!'+
                '</div>'
            );
        } else {
            $(".alert-msg").empty().html(
                '<div class="alert alert-danger alert-dismissable">' +
                    '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                  '<strong>Error!</strong> Internal Problem! Try Again!' +
                '</div>'
            );
        }
    },

    ShowDetails: function() {
        app.GetProduct();
    },

    GetProduct: function() {
        var id = Number($("table").attr('data-productId'));
        $.get("/api/Products/" + id, function (product) {
            $("table tr:nth-child(1) td").text(product.ProductName);
            $("table tr:nth-child(2) td").text(product.Price);
            $("table tr:nth-child(3) td").text(product.Description);
        });
    },

    Edit: {
        Init: function() {
            app.Edit.GetProduct();
        },
        UpdateProduct: function () {
            $.ajax({
                url: "/api/Products/" + $("#ProductId").val(),
                type: "PUT",
                data: $("#editForm").serialize(),
                success: function(response) {
                    window.location.href = "/Product";    
                }
            });
            return false;
        },
        GetProduct: function() {
            $.get("/api/Products/" + $("#ProductId").val(), function(product) {
                if (product !== {}) {
                    $("#ProductName").val(product.ProductName);
                    $("#Price").val(product.Price);
                    $("#Description").val(product.Description);
                }
            });
        }
    }

};