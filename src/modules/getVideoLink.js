module.exports = function separate(link){

    if(!link.includes("https://www.youtube.com/watch?v=")){
        return false
    }

    let x = link.split("=")
    let y = x[1]
    return y
}