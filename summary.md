# Attention Is All You Need — Important Lines

## Pages 1–3

> **Note:** Line numbers below are the PDF's extracted line numbers, so they can be used to locate the exact text in the attached paper.

---

# 📄 Page 1 — Abstract

### 🔴 CRITICAL

* We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. 

* Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train. 

* Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles, by over 2 BLEU. 

* On the WMT 2014 English-to-French translation task, our model establishes a new single-model state-of-the-art BLEU score of 41.8 after training for 3.5 days on eight GPUs 

* We show that the Transformer generalizes well to other tasks by applying it successfully to English constituency parsing both with large and limited training data. 

### 🟠 IMPORTANT

* The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. 

* The best performing models also connect the encoder and decoder through an attention mechanism. 

---

# 📄 Page 2 — Introduction & Background

## 🔴 CRITICAL

* This inherently sequential nature precludes parallelization within training examples, which becomes critical at longer sequence lengths 

* The fundamental constraint of sequential computation, however, remains. 

* Attention mechanisms have become an integral part of compelling sequence modeling and transduction models in various tasks, allowing modeling of dependencies without regard to their distance in the input or output sequences 

* In this work we propose the Transformer, a model architecture eschewing recurrence and instead relying entirely on an attention mechanism to draw global dependencies between input and output. 

* The Transformer allows for significantly more parallelization and can reach a new state of the art in translation quality after being trained for as little as twelve hours on eight P100 GPUs. 

## 🟠 IMPORTANT — Why Transformer Over Convolution

* In these models, the number of operations required to relate signals from two arbitrary input or output positions grows in the distance between positions, linearly for ConvS2S and logarithmically for ByteNet. 

* This makes it more difficult to learn dependencies between distant positions 

* In the Transformer this is reduced to a constant number of operations, albeit at the cost of reduced effective resolution due to averaging attention-weighted positions, an effect we counteract with Multi-Head Attention 

## 🟠 IMPORTANT — Self-Attention

* Self-attention, sometimes called intra-attention is an attention mechanism relating different positions of a single sequence in order to compute a representation of the sequence. 

* To the best of our knowledge, however, the Transformer is the first transduction model relying entirely on self-attention to compute representations of its input and output without using sequence-aligned RNNs or convolution. 

## 🟠 IMPORTANT — Encoder–Decoder Foundation

* Most competitive neural sequence transduction models have an encoder-decoder structure 

* the encoder maps an input sequence of symbol representations (x1, ..., xn) to a sequence of continuous representations z = (z1, ..., zn). 

* Given z, the decoder then generates an output sequence (y1, ..., ym) of symbols one element at a time. 

---

# 📄 Page 3 — Transformer Architecture

## 🔴 CRITICAL — Overall Architecture

* The Transformer follows this overall architecture using stacked self-attention and point-wise, fully connected layers for both the encoder and decoder 

### 🔴 Encoder

* The encoder is composed of a stack of N = 6 identical layers. 

* Each layer has two sub-layers. The first is a multi-head self-attention mechanism, and the second is a simple, position-wise fully connected feed-forward network. 

* We employ a residual connection around each of the two sub-layers, followed by layer normalization. 

* the output of each sub-layer is LayerNorm(x + Sublayer(x)) 

* all sub-layers in the model, as well as the embedding layers, produce outputs of dimension dmodel = 512. 

### 🔴 Decoder

* The decoder is also composed of a stack of N = 6 identical layers. 

* the decoder inserts a third sub-layer, which performs multi-head attention over the output of the encoder stack. 

* We also modify the self-attention sub-layer in the decoder stack to prevent positions from attending to subsequent positions. 

* This masking, combined with fact that the output embeddings are offset by one position, ensures that the predictions for position i can depend only on the known outputs at positions less than i. 

---


# Pages 4–6 — Lines to Highlight

## Page 4

* An attention function can be described as mapping a query and a set of key-value pairs to an output

* The output is computed as a weighted sum of the values, where the weight assigned to each value is computed by a compatibility function of the query with the corresponding key.

* We call our particular attention ‘Scaled Dot-Product Attention’

* We compute the dot products of the query with all keys, divide each by √dk, and apply a softmax function to obtain the weights on the values.

* Attention(Q, K, V ) = softmax(QKT / √dk)V

* Dot-product attention is identical to our algorithm, except for the scaling factor of √1/dk.

* dot-product attention is much faster and more space-efficient in practice, since it can be implemented using highly optimized matrix multiplication code.

* for large values of dk, the dot products grow large in magnitude, pushing the softmax function into regions where it has extremely small gradients.

* To counteract this effect, we scale the dot products by √1/dk.

---

## Page 5

* we found it beneficial to linearly project the queries, keys and values h times with different, learned linear projections

* On each of these projected versions of queries, keys and values we then perform the attention function in parallel

* Multi-head attention allows the model to jointly attend to information from different representation subspaces at different positions.

* In this work we employ h = 8 parallel attention layers, or heads.

* For each of these we use dk = dv = dmodel/h = 64.

* Due to the reduced dimension of each head, the total computational cost is similar to that of single-head attention with full dimensionality.

* The Transformer uses multi-head attention in three different ways

* In ‘encoder-decoder attention’ layers, the queries come from the previous decoder layer, and the memory keys and values come from the output of the encoder.

* This allows every position in the decoder to attend over all positions in the input sequence.

* The encoder contains self-attention layers.

* Each position in the encoder can attend to all positions in the previous layer in the encoder.

* self-attention layers in the decoder allow each position in the decoder to attend to all positions in the decoder up to and including that position.

* We need to prevent leftward information flow in the decoder to preserve the auto-regressive property.

* We implement this inside of scaled dot-product attention by masking out (setting to −∞) all values in the input of the softmax which correspond to illegal connections.

* each of the layers in our encoder and decoder contains a fully connected feed-forward network, which is applied to each position separately and identically.

* This consists of two linear transformations with a ReLU activation in between.

* FFN(x) = max(0, xW1 + b1)W2 + b2

* The dimensionality of input and output is dmodel = 512, and the inner-layer has dimensionality dff = 2048.

* we share the same weight matrix between the two embedding layers and the pre-softmax linear transformation

---

## Page 6

* Self-Attention O(n² · d) O(1) O(1)— the table's self-attention complexity, sequential operations, and maximum path length. 

* Recurrent O(n · d²) O(n) O(n)— useful comparison against self-attention. 

* Since our model contains no recurrence and no convolution, in order for the model to make use of the order of the sequence, we must inject some information about the relative or absolute position of the tokens in the sequence.

* we add ‘positional encodings’ to the input embeddings at the bottoms of the encoder and decoder stacks.

* In this work, we use sine and cosine functions of different frequencies

* We chose this function because we hypothesized it would allow the model to easily learn to attend by relative positions

* We chose the sinusoidal version because it may allow the model to extrapolate to sequence lengths longer than the ones encountered during training.

### Why Self-Attention

* One is the total computational complexity per layer.

* Another is the amount of computation that can be parallelized, as measured by the minimum number of sequential operations required.

* The third is the path length between long-range dependencies in the network.

* Learning long-range dependencies is a key challenge in many sequence transduction tasks.

* The shorter these paths between any combination of positions in the input and output sequences, the easier it is to learn long-range dependencies.

* a self-attention layer connects all positions with a constant number of sequentially executed operations, whereas a recurrent layer requires O(n) sequential operations.

* self-attention layers are faster than recurrent layers when the sequence length n is smaller than the representation dimensionality d


# Pages 7–9 — Lines to Highlight

## Page 7

* To improve computational performance for tasks involving very long sequences, self-attention could be restricted to considering only a neighborhood of size r in the input sequence centered around the respective output position.

* This would increase the maximum path length to O(n/r).

* A single convolutional layer with kernel width k < n does not connect all pairs of input and output positions.

* Doing so requires a stack of O(n/k) convolutional layers in the case of contiguous kernels, or O(logk(n)) in the case of dilated convolutions

* Convolutional layers are generally more expensive than recurrent layers, by a factor of k.

* As side benefit, self-attention could yield more interpretable models.

* Not only do individual attention heads clearly learn to perform different tasks, many appear to exhibit behavior related to the syntactic and semantic structure of the sentences.

### Training Setup

* We trained on the standard WMT 2014 English-German dataset consisting of about 4.5 million sentence pairs.

* For English-French, we used the significantly larger WMT 2014 English-French dataset consisting of 36M sentences

* Each training batch contained a set of sentence pairs containing approximately 25000 source tokens and 25000 target tokens.

* We trained our models on one machine with 8 NVIDIA P100 GPUs.

* We trained the base models for a total of 100,000 steps or 12 hours.

* The big models were trained for 300,000 steps (3.5 days).

* We used the Adam optimizer [20] with β1 = 0.9, β2 = 0.98 and ϵ = 10−9.

* This corresponds to increasing the learning rate linearly for the first warmup_steps training steps, and decreasing it thereafter proportionally to the inverse square root of the step number.

* We used warmup_steps = 4000.

---

# Page 8

### Results / Model Performance

* The Transformer achieves better BLEU scores than previous state-of-the-art models on the English-to-German and English-to-French newstest2014 tests at a fraction of the training cost.

* Transformer (big) 28.4 41.8 2.3 · 10¹⁹— Table 2's reported BLEU scores and training cost. 

* For the base model, we use a rate of Pdrop = 0.1.

* Label Smoothing During training, we employed label smoothing of value ϵls = 0.1.

* This hurts perplexity, as the model learns to be more unsure, but improves accuracy and BLEU score.

### English → German

* the big transformer model ... outperforms the best previously reported models (including ensembles) by more than 2.0 BLEU, establishing a new state-of-the-art BLEU score of 28.4.

* Training took 3.5 days on 8 P100 GPUs.

* Even our base model surpasses all previously published models and ensembles, at a fraction of the training cost of any of the competitive models.

### English → French

* our big model achieves a BLEU score of 41.0, outperforming all of the previously published single models, at less than 1/4 the training cost of the previous state-of-the-art model.

### Inference

* For the base models, we used a single model obtained by averaging the last 5 checkpoints

* For the big models, we averaged the last 20 checkpoints.

* We used beam search with a beam size of 4 and length penalty α = 0.6

* We set the maximum output length during inference to input length + 50, but terminate early when possible

---

# Page 9

## Model Variations

* While single-head attention is 0.9 BLEU worse than the best setting, quality also drops off with too many heads.

* reducing the attention key size dk hurts model quality.

* This suggests that determining compatibility is not easy and that a more sophisticated compatibility function than dot product may be beneficial.

* bigger models are better, and dropout is very helpful in avoiding over-fitting.

* we replace our sinusoidal positional encoding with learned positional embeddings [9], and observe nearly identical results to the base model.

## English Constituency Parsing

* To evaluate if the Transformer can generalize to other tasks we performed experiments on English constituency parsing.

* This task presents specific challenges: the output is subject to strong structural constraints and is significantly longer than the input.

* RNN sequence-to-sequence models have not been able to attain state-of-the-art results in small-data regimes

* We trained a 4-layer transformer with dmodel = 1024 on the Wall Street Journal (WSJ) portion of the Penn Treebank, about 40K training sentences.

* We also trained it in a semi-supervised setting, using the larger high-confidence and BerkleyParser corpora ... with approximately 17M sentences.

* We used a vocabulary of 16K tokens for the WSJ only setting and a vocabulary of 32K tokens for the semi-supervised setting.


---

# Pages 10–11 — Lines to Highlight

## Page 10

* Our results in Table 4 show that despite the lack of task-specific tuning our model performs surprisingly well, yielding better results than all previously reported models with the exception of the Recurrent Neural Network Grammar.

* In contrast to RNN sequence-to-sequence models, the Transformer outperforms the Berkeley-Parser even when training only on the WSJ training set of 40K sentences.

* In this work, we presented the Transformer, the first sequence transduction model based entirely on attention, replacing the recurrent layers most commonly used in encoder-decoder architectures with multi-headed self-attention.

* For translation tasks, the Transformer can be trained significantly faster than architectures based on recurrent or convolutional layers.

* On both WMT 2014 English-to-German and WMT 2014 English-to-French translation tasks, we achieve a new state of the art.

* In the former task our best model outperforms even all previously reported ensembles.

* We are excited about the future of attention-based models and plan to apply them to other tasks.

* We plan to extend the Transformer to problems involving input and output modalities other than text

* to investigate local, restricted attention mechanisms to efficiently handle large inputs and outputs such as images, audio and video.

* Making generation less sequential is another research goals of ours.

### Table 4 — useful result to mark

* **Transformer (4 layers), WSJ only: 91.3 F1** 
* **Transformer (4 layers), semi-supervised: 92.7 F1** 

---

## Page 11

Page 11 contains **references only**, so there are **no new technical statements or results that need highlighting**. 
