Great! Since you have provided the Mongoose schema, the field name for creation date is `createdAt`, and you want to perform server-side sorting, I'll provide you with examples for sorting documents in both ascending and descending order based on the `createdAt` field.

Let's assume your Mongoose model is named `Media`. You can use the `sort` method in your query to achieve this. Here are examples for both ascending and descending order:

```javascript
const Media = mongoose.model("Media", mediaSchema);

// Sorting in ascending order by createdAt
Media.find()
  .sort({ createdAt: 1 })
  .exec((err, result) => {
    if (err) {
      console.error(err);
      // Handle the error
    } else {
      console.log(result);
      // Handle the sorted documents
    }
  });

// Sorting in descending order by createdAt
Media.find()
  .sort({ createdAt: -1 })
  .exec((err, result) => {
    if (err) {
      console.error(err);
      // Handle the error
    } else {
      console.log(result);
      // Handle the sorted documents
    }
  });
```

In the `sort` method, the value `1` represents ascending order, and `-1` represents descending order. Adjust the sorting order based on your preference.

Make sure to replace `'Media'` with the actual name of your Mongoose model. This code assumes that your `createdAt` field is correctly defined in your schema.

Feel free to adapt the code according to your application structure and error handling preferences. If you have any further questions or need additional assistance, feel free to ask!
