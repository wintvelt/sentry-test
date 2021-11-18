//test get api endpoint
import axios from 'axios'
import urls from '../../npm-TODO/apiEndpoints'

const getUrl = urls.get.dev // only test on dev stack

test("API GET OK", async () => {
    let result
    try {
        result = await axios.get(getUrl)
        if (result.status > 299) throw new Error(result.statusText)
    } catch (error) {
        console.error(error.message)
    }
    console.log({result})
})

test("API GET ERROR", async () => {
    let result
    try {
        result = await axios.get(getUrl+'/id=YES')
        if (result.status > 299) throw new Error(result.statusText)
    } catch (error) {
        result = error.response
    }
    console.log({result})
})