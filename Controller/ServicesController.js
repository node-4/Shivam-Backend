const ServicesService = require('../Service/ServicesService');
const Wishlist = require('../Models/WishlistModel');
const Services = require('../Models/Services');
exports.addService = async (req, res) => {
	try {
		const payload = req.body
		payload.sellerId = req.user
		const result = await ServicesService.addService(payload)
		if (result) {
			return res.status(result.status).json({ message: result.message, success: result.success, status: result.status, data: result.data })
		} else {
			return res.status(result.status).json({ message: result.message, success: result.success, status: result.status })
		}
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: error.message })
	}
}
exports.getService = async (req, res) => {
	try {
		const result = await ServicesService.getService({})
		if (result.success) {
			return res.status(result.status).json({ message: result.message, status: result.status, success: result.success, data: result.data, })
		} else {
			return res.status(res.status).json({ message: result.message, status: result.status, success: result.success })
		}
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: error.message })
	}
}
exports.getServiceByServiceTypeId = async (req, res) => {
	try {
		const serviceTypeId = req.params.ServiceTypeid
		const result = await ServicesService.getServiceByServiceTypeId(serviceTypeId)
		if (result.success) {
			return res.status(result.status).json({ message: result.message, status: result.status, success: result.success, data: result.data, })
		} else {
			return res.status(res.status).json({ message: result.message, status: result.status, success: result.success })
		}
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: error.message })
	}
}
exports.updateService = async (req, res) => {
	try {
		let payload = req.body;
		if (req.file) {
			let serviceImg = {
				filename: req.file.filename,
				filetype: req.file.mimetype,
				filesize: req.file.size,
				url: req.file.path
			}

			payload.serviceImg = serviceImg
		}
		let ServiceId = req.params.serviceid
		let result = await ServicesService.updateServices(ServiceId, payload)
		if (result.success) {
			return res.status(result.status).json({
				success: result.success,
				status: result.status,
				message: result.message,
				data: result.data
			})
		} else {
			return res.status(result.status).json({
				success: result.success,
				message: result.error
			})
		}
	} catch (error) {
		throw error
	}
}
exports.deleteService = async (req, res, next) => {
	try {
		let ServiceId = req.params.serviceid
		let result = await ServicesService.deleteService(ServiceId)
		if (result.success) {
			return res.status(result.status).json({
				success: result.success,
				status: result.status,
				message: result.message,
				data: result.data
			})
		} else {
			return res.status(result.status).json({
				success: result.success,
				status: result.status,
				message: result.error
			})
		}

	} catch (error) {
		next(error)
	}
}
exports.getSellelerSellerId = async (req, res) => {
	try {
		const sellerId = req.user
		const result = await ServicesService.getServicesSellerId(sellerId)
		console.log(result)
		if (result.status) {
			return res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: result.success,
				data: result.data
			})
		} else {
			return res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: result.success
			})
		}

	} catch (err) {
		console.log(err);
		return res.status(400).json({
			message: err.message
		})
	}
}
exports.uploadImage = async (req, res) => {
	try {
		if (req.file) {
			return res.status(200).json({ message: "Get successfully", data: req.file.path, status: 200 })
		} else {
			return res.status(404).json({ message: "Image not provide", data: {}, status: 404 })
		}
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: error.message })
	}
}
exports.createWishlist = async (req, res, next) => {
	try {
		const serviceId = req.params.id;
		const viewService = await Services.findById(serviceId);
		if (viewService) {
			let wishList = await Wishlist.findOne({ user: req.user._id });
			if (!wishList) {
				wishList = new Wishlist({ user: req.user._id, });
			}
			wishList.services.addToSet(serviceId);
			viewService.Wishlistuser.push(req.user._id);
			await wishList.save();
			await viewService.save();
			return res.status(200).json({ status: 200, message: "ServiceId add to wishlist Successfully", });
		} else {
			return res.status(404).json({ message: "Service not found", status: 404 })
		}
	} catch (error) {
		console.log(error);
		return res.status(501).send({ status: 501, message: "server error.", data: {}, });
	}
};
exports.removeFromWishlist = async (req, res, next) => {
	try {
		const wishlist = await Wishlist.findOne({ user: req.user._id });
		if (!wishlist) {
			return res.status(404).json({ message: "Wishlist not found", status: 404 });
		}
		const serviceId = req.params.id;
		const viewService = await Services.findById(serviceId);
		wishlist.services.pull(serviceId);
		viewService.Wishlistuser.pull(req.user._id);
		await wishlist.save();
		await viewService.save();
		return res.status(200).json({ status: 200, message: "Removed From Wishlist", });
	} catch (error) {
		console.log(error);
		return res.status(501).send({ status: 501, message: "server error.", data: {}, });
	}
};
exports.myWishlist = async (req, res, next) => {
	try {
		let myList = await Wishlist.findOne({ user: req.user._id }).populate('services');
		if (!myList) {
			myList = await Wishlist.create({ user: req.user._id });
		}
		let array = []
		for (let i = 0; i < myList.services.length; i++) {
			const data = await Services.findById(myList.services[i]._id).populate('category subCategory')
			array.push(data)
		}
		let obj = {
			_id: myList._id,
			user: myList.user,
			services: array,
			__v: myList.__v
		}
		return res.status(200).json({ status: 200, wishlist: obj, });
	} catch (error) {
		console.log(error);
		return res.status(501).send({ status: 501, message: "server error.", data: {}, });
	}
};