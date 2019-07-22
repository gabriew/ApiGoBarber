import notification from '../schemas/Notification';
import User from '../models/User';
class NotificationController {
    async index(req, res) {
        const checkIsProvider = await User.findOne({
            where: { id: req.userID, provider: true }
        });
        if (!checkIsProvider) {
            return res.status(401).json({ error: 'Only provider can load notifications' });
        }
        const notifications = await notification.find({
            user: req.userID
        }).sort({ createdAt: 'desc' }).limit(20)
        return res.json(notifications);
    }
    async update(req, res) {
        const notifi = await notification.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );
        res.json(notifi);
    }
}
export default new NotificationController();