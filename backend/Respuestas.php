<h3>Respuesta 3</h3>
<?php
$myArray = array(13,2,4,35,1);
$valMax = max($myArray); 
?>
<div>
    Valor Más Alto: <input type="number" value="<?php echo $valMax;?>" style="font-size:35px; width:70px;" />
</div>
<hr>
<h3>Respuesta 4</h3>
SELECT T1.department_id,T2.department_name,COUNT(T1.firstname) AS CANT  
FROM `APPX_employee` T1 
INNER JOIN `APPX_department` T2 ON T1.department_id = T2.id 
GROUP BY T2.department_name 
ORDER BY T1.department_id ASC
<hr>
<h3>Respuesta 5</h3>
<?php
$myArray = array(
    array(1,2,9),
    array(2,5,3),
    array(5,1,5));   
   for ($i = 0; $i < count($myArray); $i++) {
       for($j = 0; $j<count($myArray[$i]); $j++){
            $resultado = $myArray[$i][$j] + $myArray[$i][$j];
            if($resultado<9){
               echo $myArray[$i][$j];
            }
           echo "<br>";           
       }
   }
?>
<hr>
<h3>Respuesta 6</h3>
<?php 
$myArray = array(1,3,2,0,7,8,1,3,0,6,7,1);
$j = 12; //$j = count($myArray); 
$a = array();
$b = array();
for($i=0;$i<$j;$i++){
    if($myArray[$i]!=0){
        $a[]=$myArray[$i];        
    }else{
        $b[]=$a;
        $a=array();        
    }
}
$b[]=$a;
for($i=0;$i<count($b);$i++){
    $bloque = $b[$i];
    sort($bloque);
    if($bloque!=NULL){
        for($j=0;$j<count($bloque);$j++){
            echo $bloque[$j];
        }
    }else{
        echo 'X';
    }    
    echo '&nbsp;';
}
?>
<hr>
<h3>Respuesta 11</h3>
<?php
$a="10"; $b=$a+2;
echo '<div>Resultado:'.$b.'<div>';
?>