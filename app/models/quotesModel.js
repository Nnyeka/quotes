module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            author: String,
            quote: String
        },
        {timestamps: true}
    );
    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const Quote = mongoose.model("quote", schema)
    return Quote
}