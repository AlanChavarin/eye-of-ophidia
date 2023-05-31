export const getEventBackgroundImageURL = (event) => {
    let num
    if(event.startDate){
        num = event.startDate.substring(5, 7)
    } else {
        num = 1
    }
    
    const backgroundImage = window.location.origin + `/backgroundImages/${num}.jpg`

    if(!event.image){
        return backgroundImage
    } else if(event.bigImage){
        try{
            return URL.createObjectURL(event.bigImage)
        } catch (error) {
            return event.bigImage
        }
    } else {
        try{
            return URL.createObjectURL(event.image)
        } catch (error) {
            return event.image
        }
    }
}