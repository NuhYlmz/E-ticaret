Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  } else {
    this.ready()
  }
});

Meteor.publish('chat.messages', function (roomId) {
  return Messages.find({ roomId: roomId });
});

Meteor.publish('shop.products', function (categoryIds) {
  return Products.find({ categoryId: {$in: categoryIds} });
});