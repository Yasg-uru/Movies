class ratingcalculator{
    static calculaterating(ratings){
        if(ratings.length==0){
            return  0;
        }
        const sumofallratings=ratings.reduce((sum,rating)=>{
return sum+rating
        },0);
        const averagerating=(sumofallratings/ratings.length);
        const roundedrating=Math.round(averagerating);
        return roundedrating

    }
};
module.exports=ratingcalculator;
