import Seller from "../../../models/seller"
import Store from "../../../models/store"
import Product from "../../../models/product"
import Buyer from "../../../models/buyer"
export class GeneratedStore{
    isAvailable = false
    store = new Store()
    seller = new Seller()
    buyer = new Buyer()
    products = []
}
export class CartItem{
    id = ""
    productName = ""
    productPrice = 0
    productCategory = ""
    productImage = ""
    quantity = 1
}


export class StoreInfo{
    storeInfo = null
    async setData(user,unique){
        const data = await Store.getStoreByunique(unique)
        const sellerData = await Seller.getById(data.sellerId)
        const productData = await Product.getAllProductsByActiveStore(data._id)
        const buyer = new Buyer()
        buyer.profile.email.value = user.email
        const buyerData = await buyer.getBuyerByEmailId()
        console.warn(buyerData)
        const generatedStore = new GeneratedStore()
        generatedStore.store = data
        generatedStore.seller = sellerData
        generatedStore.products = productData
        generatedStore.buyer = buyerData
        
        generatedStore.isAvailable = data.isShow
        return generatedStore
    }
}