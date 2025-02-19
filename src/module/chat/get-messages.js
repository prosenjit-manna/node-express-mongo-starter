import Chat from './chat.mongo.js';

export async function getMessages(req, res) {
  try {
    const receiverId = req.userId;
    const { senderId, page = 1, limit = 50 } = req.body;

    if (!senderId) {
      return res.status(400).json({ error: 'senderId is required' });
    }

    const skip = (page - 1) * limit;
    
    const messages = await Chat.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    })
    .sort({ timestamp: -1 }) // Latest messages first
    .skip(skip)
    .limit(limit);

    const totalMessages = await Chat.countDocuments({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    });

    return res.json({
      messages,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalMessages / limit),
        totalMessages,
        hasMore: totalMessages > skip + messages.length
      }
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch messages',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}