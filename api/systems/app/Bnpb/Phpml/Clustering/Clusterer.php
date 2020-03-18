<?php

declare(strict_types=1);

namespace App\Bnpb\Phpml\Clustering;

interface Clusterer
{
    public function cluster(array $samples): array;
}
