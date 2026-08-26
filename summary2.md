# Pages 1–3 — Important Lines to Highlight

## Page 1

* Large language models (LLMs) inevitably exhibit hallucinations since the accuracy of generated texts cannot be secured solely by the parametric knowledge they encapsulate.

* Although retrieval-augmented generation (RAG) is a practicable complement to LLMs, it relies heavily on the relevance of retrieved documents, raising concerns about how the model behaves if retrieval goes wrong.

* We propose the Corrective Retrieval Augmented Generation (CRAG) to improve the robustness of generation.

* a lightweight retrieval evaluator is designed to assess the overall quality of retrieved documents for a query, returning a confidence degree based on which different knowledge retrieval actions can be triggered.

* Since retrieval from static and limited corpora can only return sub-optimal documents, large-scale web searches are utilized as an extension for augmenting the retrieval results.

* a decompose-then-recompose algorithm is designed for retrieved documents to selectively focus on key information and filter out irrelevant information in them.

* CRAG is plug-and-play and can be seamlessly coupled with various RAG-based approaches.

* Experiments on four datasets covering short- and long-form generation tasks show that CRAG can significantly improve the performance of RAG-based approaches.

* While RAG serves as a practicable complement to LLMs, its effectiveness is contingent upon the relevance and accuracy of the retrieved documents.

* The heavy reliance of generation on the retrieved knowledge raises significant concerns about the model’s behavior and performance in scenarios where retrieval may fail or return inaccurate results.

* a low-quality retriever is prone to introducing a substantial amount of irrelevant information, impeding the models from acquiring accurate knowledge and potentially misleading them, resulting in issues such as hallucinations. 

---

## Page 2

* most conventional RAG approaches indiscriminately incorporate the retrieved documents, regardless of whether these documents are relevant or not.

* current methods mostly treat complete documents as reference knowledge both during retrieval and utilization.

* a considerable portion of the text within these retrieved documents is often non-essential for generation, which should not have been equally referred to and involved in RAG.

* A method named Corrective Retrieval-Augmented Generation (CRAG) is proposed to self-correct the results of retriever and improve the utilization of documents for augmenting generation.

* A lightweight retrieval evaluator is designed to assess the overall quality of retrieved documents for a query.

* A confidence degree is quantified based on which different knowledge retrieval actions of {Correct, Incorrect, Ambiguous} can be triggered.

* large-scale web searches are integrated as a strategic extension, since retrieval from static and limited corpora can only return sub-optimal documents in terms of scope and diversity.

* a decompose-then-recompose algorithm is meticulously crafted throughout the retrieval and utilization process.

* This algorithm ensures the refinement of retrieved information, optimizing the extraction of key insights and minimizing the inclusion of non-essential elements.

* CRAG is plug-and-play and experimentally implemented into RAG and Self-RAG for demonstrating its adaptability to RAG-based approaches.

* Results on four datasets ... show that CRAG can significantly improve the performance of standard RAG and state-of-the-art Self-RAG.

### Main Contributions

* This paper studies the scenarios where the retriever returns inaccurate results and, to the best of our knowledge, makes the first attempt to design corrective strategies for RAG to improve its robustness.

* A plug-and-play method named CRAG is proposed to improve the ability of automatic self-correction and efficient utilization of retrieved documents.

* Experimental results extensively demonstrate CRAG’s adaptability to RAG-based approaches and its generalizability across short- and long-form generation tasks.

* one of the most severe issues that LLMs have still been struggling with is hallucinations.

* the lack of accurate and specific knowledge can lead to misleading or even inaccurate generation, which will severely hurt the experience of users in most practical applications.

* RAG ... enhances the input questions of generative LMs with retrieved documents.

---

## Page 3

* Despite this, the methods above usually ignore a question, what if the retrieval goes wrong?

* If retrieved documents are irrelevant, the retrieval system can even exacerbate the factual error that LMs make.

* Considering that retrieval is sometimes unnecessary for some queries, conversely, responses without retrieval are even more accurate in many situations.

* this study particularly studies the scenarios where the retriever returns inaccurate results.

* this paper makes the first attempt to explore and design corrective strategies for RAG to improve its robustness of generation.

### Task Formulation

* The entire framework is usually divided into a retriever R and a generator G.

* The retriever R aims to retrieve the top-K documents ... that are relevant to the input X from the corpus C.

* Based on the input X and the retrieved results D, the generator G is responsible for generating the output Y.

* It shows that the retriever and generator are seamlessly coupled, exhibiting low risk tolerance.

* Any unsuccessful retrieval can result in an unsatisfactory response, regardless of the impressive abilities of the generator.

### CRAG Architecture / Core Mechanism

* CRAG ... designs corrective strategies to improve the robustness of generation.

* a lightweight retrieval evaluator is constructed to estimate the relevance score of retrieved documents to the input query.

* The relevance score is quantified into a total of three confidence degrees and then triggered the corresponding actions: {Correct, Incorrect, Ambiguous}.

* If the action Correct is triggered, the retrieved documents will be refined into more precise knowledge strips.

* This refinement operation involves knowledge decomposition, filter, and recomposition.

* If the action Incorrect is triggered, the retrieved documents will be discarded. Instead, web searches are resorted to and regarded as complementary knowledge sources for corrections.

* when it cannot confidently make a correct or incorrect judgment, a soft and balanced action Ambiguous which combines both of them is triggered.

* After optimizing the retrieval results, an arbitrary generative model can be adopted.

* The accuracy of the retrieval evaluator undeniably plays a pivotal role in shaping the overall system performance, as it influences the outcomes of subsequent processes.


# Pages 4–5 — Important Lines to Highlight

## Page 4

* A retrieval evaluator is constructed to evaluate the relevance of the retrieved documents to the input, and estimate a confidence degree based on which different knowledge retrieval actions of {Correct, Incorrect, Ambiguous} can be triggered.

* Our objective is to correct the retrieved documents if they are irrelevant.

* T5-large ... is adopted for initializing the retrieval evaluator and fine-tuned.

* The relevance signals for fine-tuning the evaluator can be collected from the existing datasets.

* the negative samples for fine-tuning were all randomly sampled from the retrieval results, which are rather similar to the input query but not relevant.

* For every question, there are generally 10 documents retrieved.

* the evaluator predicts the relevance score for each question-document pair individually.

* Based on these calculated relevance scores, a final judgment is made as to whether the retrieval is correct or not associated with the action trigger.

* the retrieval quality is evaluated at a relatively low cost without the need to have access to large and expensive LLMs.

* the evaluator designed in CRAG demonstrates the advantages of being quite lightweight (0.77B).

### Figure 2 — Architecture to Understand

The **Figure 2 pipeline** is worth highlighting/annotating because it summarizes the complete CRAG flow:

**Retrieval → Retrieval Evaluator → Correct / Ambiguous / Incorrect → Knowledge Refinement and/or Web Search → Knowledge Correction → Generation.** 

---

# Page 5

## Algorithm 1 — CRAG Inference

* scorei = E evaluates the relevance of each pair (x, di), di ∈ D

* Confidence = Calculate and give a final judgment based on {score1, score2, ...scorek}

* Confidence has 3 optional values: [CORRECT], [INCORRECT] or [AMBIGUOUS]

* if Confidence == [CORRECT] then ... Internal_Knowledge = Knowledge_Refine(x, D)

* else if Confidence == [INCORRECT] then ... External_Knowledge = Web_Search(W Rewrites x for searching)

* else if Confidence == [AMBIGUOUS] then ... Internal_Knowledge = Knowledge_Refine(x, D)and External_Knowledge = Web_Search(W Rewrites x for searching)

* G predicts y given x and k

## Action Trigger

* Based on the aforementioned confidence score for each retrieved document, three types of actions are designed and triggered accordingly where the upper and lower thresholds are set.

* If the confidence score is higher than the upper threshold, the retrieved document is identified as Correct, while identified as Incorrect if below the lower threshold. Otherwise, a more soft and intermediate action, i.e., Ambiguous is executed.

* Each retrieved document is conducted individually and integrated eventually.

### Correct

* a retrieval is assumed Correct when the confidence score of at least one retrieved document is higher than the upper threshold.

* However, even if a relevant document can be found, there is inevitably some noisy knowledge strips in this document.

* To extract the most critical knowledge strips within this document, a knowledge refinement method is further designed

### Incorrect

* a retrieval is assumed Incorrect when the confidence scores of all retrieved documents are below the lower threshold.

* Once the knowledge from the retrieval results is judged to be inaccurate, it is unwise to still get stuck in it, which is likely to result in fabricated facts.

* Therefore, we need to seek new sources of knowledge for correction.

* Here, web search is introduced to search from the Internet

### Ambiguous

* The remaining will be assigned to an intermediate action of Ambiguous.

* This generally occurs when the accuracy of the retrieval is hard to distinguish and the evaluator gives an intermediate score.

* Since the retrieval evaluator is not confident in its judgment, both types of processed knowledge in Correct and Incorrect are combined to complement each other.

* Implementing such a moderating and soft strategy can significantly contribute to strengthening the robustness and resilience of the system

### Important Design Insight

* Preliminary experiments of employing only the Correct and Incorrect actions show that the efficacy of CRAG was easily affected by the accuracy of the retrieval evaluator.

This last point is particularly useful because it explains **why CRAG needs the third “Ambiguous” action instead of making every retrieval decision binary.**


# Pages 6–7 — Important Lines to Highlight

## Page 6

### Knowledge Refinement

* a decompose-then-recompose knowledge refinement method is designed to further extract the most critical knowledge strips in it.

* To obtain fine-grained retrieval results, we segmented the retrieved results into internal strips.

* The scale is assumed to include an independent piece of information, and the filtering is based on the segments.

* the retrieval evaluator fine-tuned in Section 4.2 is employed to calculate the relevance score of each knowledge strip.

* irrelevant knowledge strips are filtered out, while relevant ones are recomposed via concatenation in order, namely internal knowledge.

### Web Search

* It would be more intelligent if a system itself could determine that its existing knowledge corpus could not solve the problem well and turn to additional external knowledge for help.

* even if a system knows that the existing knowledge cannot solve the problem, but still sticks to the limited knowledge corpus, it will only give a fabricated fact in the end, which is called hallucination.

* it is extremely important to seek complementary external knowledge if the retrieved results are all assumed irrelevant

* we consider a system that knows what it doesn’t know and what it cannot answer to be more intelligent than one that clings to limited knowledge and is incapable of seeking external knowledge.

* Since retrieval from static and limited corpora can only return sub-optimal documents in terms of scope and diversity, large-scale web searches ... are integrated as a strategic extension of RAG.

* the inputs are rewritten into queries composed of keywords by ChatGPT to mimic the daily usage of search engine.

* a public and accessible commercial web search API is adopted to generate a series of URL links for every query.

* Considering that knowledge from large-scale web searches could introduce biases or unreliable information, authoritative and regulated web pages like Wikipedia are preferred

* we utilize the URL links to navigate web pages, transcribe their content, and employ the same knowledge refinement method as Section 4.4 to derive the relevant web knowledge

### Experiments

* We conducted experiments to extensively demonstrate CRAG’s adaptability to RAG-based approaches and its generalizability across both short- and long-form generation tasks.

* CRAG was evaluated on four datasets, including PopQA (short-form generation), Biography (long-form generation), PubHealth (true-or-false question), and Arc-Challenge (multiple-choice question).

* accuracy was adopted as the evaluation metric for PopQA, PubHealth, and Arc-Challenge. FactScore ... was adopted as the evaluation metric for Biography.

* The difference lies in that our motivation is to improve the retrieval quality by correcting the retrieval results that the system judges to be of low quality.

---

# Page 7

## Table 1 — Results

The **Table 1 is very important** because it compares CRAG against models **without retrieval, standard RAG, and advanced RAG approaches** across four datasets. 

### Particularly important numbers to highlight:

* **LLaMA2-hf-7b: RAG → CRAG**

  * PopQA: **50.5 → 54.9**
  * Bio: **44.9 → 47.7**
  * PubHealth: **48.9 → 59.5**
  * ARC: **43.4 → 53.7** 

* **SelfRAG-LLaMA2-7b: RAG → CRAG**

  * PopQA: **52.8 → 59.8**
  * Bio: **59.2 → 74.1**
  * PubHealth: **39.0 → 75.6**
  * ARC: **53.2 → 68.6** 

* **Self-RAG → Self-CRAG**

  * PopQA: **54.9 → 61.8**
  * Bio: **81.2 → 86.2**
  * PubHealth: **72.4 → 74.8**
  * ARC: **67.3 → 67.2** 

### Experimental setup / baselines

* We primarily compared CRAG with both approaches with and without retrieval

* Standard RAG. We evaluated the standard RAG ... where an LM generates output given the query prepended with the top retrieved documents using the same retriever as in our system.

* Advanced RAG. (1) SAIL ... (2) Self-RAG ... (3) ... retrieval-augmented baselines trained with private data

* The model coupling the proposed method with standard RAG is named CRAG and that coupling with Self-RAG is named Self-CRAG.

### ⭐ Most useful takeaway from Page 7

**CRAG generally improves standard RAG and Self-RAG across the evaluated datasets, with particularly large gains visible for PubHealth and ARC when coupled with the LLaMA2-based systems.** The table is worth highlighting as a whole because it provides the paper's central experimental evidence. 



# Pages 8–9 — Important Lines to Highlight

## Page 8

* the proposed method can significantly improve the performance of RAG and Self-RAG.

* CRAG outperformed RAG by margins of 7.0% accuracy on PopQA, 14.9% FactScore on Biography, 36.6% accuracy on PubHealth, and 15.4% accuracy on Arc-Challenge when based on SelfRAG-LLaMA2-7b

* Compared with the current state-of-the-art Self-RAG, Self-CRAG outperformed it by margins of 20.0% accuracy on PopQA, 36.9% FactScore on Biography, and 4.0% accuracy on Arc-Challenge when based on LLaMA2-hf-7b

* These results demonstrated the adaptability of CRAG which is plug-and-play and can be implemented into RAG-based approaches.

* the proposed method demonstrated great generalizability across a variety of generation tasks.

* Its versatility across a spectrum of tasks underscores its robust capabilities and generalizability across diverse scenarios.

* the proposed method exhibited greater flexibility in replacing the underlying LLM generator.

* CRAG does not have any requirements for this ability.— referring to the requirement for special critic-token generation used by Self-RAG. 

* when more advanced LLMs are available in the future, they can be coupled with CRAG easily

### Ablation — Triggered Actions

* The impact of each triggered action.

* there was a performance drop no matter which action was removed, illustrating that each action contributed to improving the robustness of generation.

### Table 2 — Useful Numbers

* **CRAG: 54.9 → without Correct: 53.2 → without Incorrect: 54.4 → without Ambiguous: 54.0** for LLaMA2-hf-7b. 

* **Self-CRAG: 49.0 → without Correct: 43.6 → without Incorrect: 47.7 → without Ambiguous: 48.1** for LLaMA2-hf-7b. 

These results support the conclusion that **all three actions—Correct, Incorrect, and Ambiguous—contribute to CRAG's robustness.** 

### Table 3 — Knowledge Utilization

* Removing document refinement denoted that the original retrieved documents were directly fed to the following generator, as in most existing works.

* removing search query rewriting denoted that questions were not rewritten into queries consisting of keywords during knowledge searching.

* removing knowledge selection denoted that all searched content of web pages was all regarded as the external knowledge without selection.

* the performance of the final system degraded no matter which knowledge utilization operation was removed, revealing that each knowledge utilization operation contributed to improving the utilization of knowledge.

---

# Page 9

## Retrieval Evaluator

* The quality of the retrieval evaluator significantly determined the performance of the entire system.

* Results reveal that the lightweight T5-based retrieval evaluator significantly outperformed the competitive ChatGPT in all settings.

### Table 4 — Retrieval Evaluator Accuracy

* Our Retrieval Evaluator (T5-based) — 84.3

* ChatGPT — 58.0

* ChatGPT-CoT — 62.4

* ChatGPT-few-shot — 64.7

This is an important experimental result because the **0.77B T5-based evaluator** is substantially more accurate on this retrieval-evaluation task than the tested ChatGPT configurations. 

---

## Robustness to Retrieval Performance

* To further verify the robustness of the proposed method to retrieval performance, we studied how the generation performance changed given different retrieval performance.

* A part of accurate retrieval results were deliberately removed at random to imitate a low-quality retriever and evaluate how the performance changed.

* the generation performance of Self-RAG and Self-CRAG dropped as the retrieval performance dropped, indicating that the generator relied heavily on the quality of the retriever.

* as the retrieval performance dropped, the generation performance of Self-CRAG dropped more slightly than that of Self-RAG.

* These results imply the superiority of Self-CRAG over Self-RAG on enhancing the robustness to retrieval performance.

### Table 5 — Important Comparison

* **CRAG: 54.9 vs RAG: 50.5** on LLaMA2-hf-7b. 

* **Self-CRAG: 49.0 vs Self-RAG: 29.0** on LLaMA2-hf-7b. 

* **Self-CRAG: 61.8 vs Self-RAG: 54.9** on SelfRAG-LLaMA2-7b. 

* This paper highlights the necessity of enhancing the retrieved context by incorporating additional information when the initial retrieval results are irrelevant and unreliable.



# Pages 10–11 — Important Lines to Highlight

## Page 10

### Web Search vs. Self-Correction

* consistently supplementing RAG or Self-RAG with web search knowledge can improve the performance in most cases ... though the improvement remains limited.

* augmenting RAG or Self-RAG with the proposed self-correction mechanism significantly outperformed the models consistently supplemented with web search knowledge in all cases.

* This finding confirms that the observed advancements are primarily attributable to the proposed self-correction mechanism.

### Computational Overhead

* our self-correction mechanism serves as a lightweight, plug-and-play solution for various RAG-based frameworks

* Due to the adaptive nature of Self-RAG, which varies its generation strategies based on input, the computational overhead cannot be precisely determined. Therefore, we present an estimated range instead.

* the self-correction mechanism incurs only modest computational overhead while significantly enhancing performance, thereby validating its lightweight nature.

### Table 6 — Computational Cost

* **RAG: 26.5 TFLOPs/token, 0.363s**
* **CRAG: 27.2 TFLOPs/token, 0.512s**
* **Self-RAG: 26.5–132.4 TFLOPs/token, 0.741s**
* **Self-CRAG: 27.2–80.2 TFLOPs/token, 0.908s** 

> The table represents a **rough estimate of the generation phase only**; retrieval and data-processing stages are not included. 

---

## Page 11

Page 11 is **entirely references**. There are therefore **no new technical statements, experimental findings, algorithms, limitations, or conclusions to highlight** from this page. 

For your actual highlighting, **you can skip Page 11 completely**.
