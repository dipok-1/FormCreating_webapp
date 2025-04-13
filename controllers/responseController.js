const Response = require('../models/response'); 
const Form = require('../models/form');

const submitResponse = async (req, res) => {
  try {
    const { formId } = req.params;
    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).send({ message: 'Form not found' });
    }

    const { answers } = req.body;
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).send({ message: 'Answers are required and must be an array' });
    }

    const validQuestionIds = form.questions.map(q => q._id.toString());
    for (let ans of answers) {
      if (!validQuestionIds.includes(ans.questionId)) {
        return res.status(400).send({ message: `Invalid questionId: ${ans.questionId}` });
      }
    }

    const newResponse = new Response({
      formId,
      answers
    });

    await newResponse.save();
    return res.status(201).send({ message: 'Response successfully added' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error during response submission' });
  }
};

module.exports = { submitResponse };
