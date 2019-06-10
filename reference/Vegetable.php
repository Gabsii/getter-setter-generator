class Vegetable {

var $edible;
var $color;

function __construct($edible, $color="green")
{
    $this->edible = $edible;
    $this->color = $color;
}

function is_edible()
{
    return $this->edible;
}

function what_color()
{
    return $this->color;
}

}
