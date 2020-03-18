<?php

declare(strict_types=1);

namespace App\Bnpb\Phpml\Tokenization;

interface Tokenizer
{
    public function tokenize(string $text): array;
}
